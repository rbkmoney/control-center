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

# Base image for the service
BASE_IMAGE_NAME := service-fe
BASE_IMAGE_TAG := 768cf0f40600e290060502e047dd2e86d4fd6020

BUILD_IMAGE_TAG := 1862224e600e34a9bd04327db7b3186fa4d31ceb

GIT_SSH_COMMAND :=
DOCKER_RUN_OPTS = -e GIT_SSH_COMMAND='$(GIT_SSH_COMMAND)'

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
	npm install

compile: compile-damsel compile-machinegun compile-fistful

build: check lint compile
	npm run build

clean-compile: clean compile

clean:
	rm -rf dist src/app/thrift/gen-* src/assets/meta-damsel.json src/app/gen-damsel src/app/machinegun/gen-* src/app/fistful/gen-*

compile-damsel: damsel-client damsel-model damsel-meta

damsel-client:
	@$(foreach file,domain_config payment_processing merch_stat,echo $(file); thrift -r -gen js:node,runtime_package=woody_js/dist/thrift -o ./src/app/thrift ./node_modules/damsel/proto/$(file).thrift;)

damsel-meta:
	npm run damsel-meta

damsel-model:
	npm run damsel-model

compile-machinegun: machinegun-model machinegun-client

machinegun-client:
	@$(foreach file,state_processing,echo $(file); thrift -r -gen js:node,runtime_package=woody_js/dist/thrift -o ./src/app/machinegun ./node_modules/machinegun_proto/proto/$(file).thrift;)

machinegun-model:
	npm run machinegun-model

compile-fistful: fistful-model fistful-client

fistful-client:
	@$(foreach file,withdrawal_session,echo $(file); thrift -r -gen js:node,runtime_package=woody_js/dist/thrift -o ./src/app/fistful ./node_modules/fistful-proto/proto/$(file).thrift;)

fistful-model:
	npm run fistful-model

lint:
	npm run lint

check:
	npm run check	
