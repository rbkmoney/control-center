SUBMODULES = build_utils
SUBTARGETS = $(patsubst %,%/.git,$(SUBMODULES))

UTILS_PATH := build_utils
TEMPLATES_PATH := .

# Name of the service
SERVICE_NAME := control-center
# Service image default tag
SERVICE_IMAGE_TAG ?= $(shell git rev-parse HEAD)
# The tag for service image to be pushed with
SERVICE_IMAGE_PUSH_TAG ?= $(SERVICE_IMAGE_TAG)

REGISTRY ?= dr2.rbkmoney.com

# Base image for the service
BASE_IMAGE_NAME := service-fe
BASE_IMAGE_TAG := 2b4570bc1d9631c10aaed2132eb87eb9003f3471

BUILD_IMAGE_TAG := f3732d29a5e622aabf80542b5138b3631a726adb

GIT_SSH_COMMAND :=
DOCKER_RUN_OPTS = -e GIT_SSH_COMMAND='$(GIT_SSH_COMMAND)' -e NG_CLI_ANALYTICS=ci -e NPM_TOKEN='$(GITHUB_TOKEN)'


CALL_W_CONTAINER := init build clean submodules

.PHONY: $(CALL_W_CONTAINER)

all: build

-include $(UTILS_PATH)/make_lib/utils_image.mk
-include $(UTILS_PATH)/make_lib/utils_container.mk

$(SUBTARGETS): %/.git: %
	git submodule update --init $<
	touch $@

submodules: $(SUBTARGETS)

init:
	echo -e "npm config set //npm.pkg.github.com/ _authToken=$(NPM_TOKEN)" >> .npmrc
	npm ci

compile: compile-damsel compile-machinegun compile-fistful compile-messages compile-file-storage compile-ank

build: check lint compile
	npm run build

clean-compile: clean compile

clean:
	rm -rf dist src/app/thrift/gen-* src/assets/meta-damsel.json src/app/gen-model src/app/machinegun/gen-* src/app/fistful/gen-* src/app/messages/gen-* src/app/file-storage/gen-* src/app/ank/gen-*

compile-damsel: damsel-client damsel-model damsel-meta

damsel-client:
	@$(foreach file,domain_config payment_processing merch_stat claim_management,echo $(file); thrift -r -gen js:node,runtime_package=woody_js/dist/thrift -o ./src/app/thrift-services/damsel ./node_modules/damsel/proto/$(file).thrift;)

damsel-meta:
	npm run damsel-meta

damsel-model:
	npm run damsel-model

compile-machinegun: machinegun-model machinegun-client

machinegun-client:
	@$(foreach file,state_processing,echo $(file); thrift -r -gen js:node,runtime_package=woody_js/dist/thrift -o ./src/app/thrift-services/machinegun ./node_modules/machinegun_proto/proto/$(file).thrift;)

machinegun-model:
	npm run machinegun-model

compile-fistful: fistful-model fistful-client

fistful-client:
	@$(foreach file,withdrawal_session fistful_admin fistful_stat,echo $(file); thrift -r -gen js:node,runtime_package=woody_js/dist/thrift -o ./src/app/thrift-services/fistful ./node_modules/fistful-proto/proto/$(file).thrift;)

fistful-model:
	npm run fistful-model

compile-messages: messages-model messages-client

messages-client:
	@$(foreach file,messages,echo $(file); thrift -r -gen js:node,runtime_package=woody_js/dist/thrift -o ./src/app/thrift-services/messages ./node_modules/messages-proto/proto/$(file).thrift;)

messages-model:
	npm run messages-model

compile-file-storage: file-storage-model file-storage-client

file-storage-client:
	@$(foreach file,file_storage,echo $(file); thrift -r -gen js:node,runtime_package=woody_js/dist/thrift -o ./src/app/thrift-services/file-storage ./node_modules/file-storage-proto/proto/$(file).thrift;)

file-storage-model:
	npm run file-storage-model

compile-ank: ank-model ank-client

ank-client:
	@$(foreach file,questionary_manager,echo $(file); thrift -r -gen js:node,runtime_package=woody_js/dist/thrift -o ./src/app/thrift-services/ank ./node_modules/ank-proto/proto/$(file).thrift;)

ank-model:
	npm run ank-model

lint:
	npm run lint

check:
	npm run check	
