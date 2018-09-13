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

CALL_W_CONTAINER := init build clean submodules thrift

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

build: lint src/gen-nodejs src/gen-json thrift-to-js/payment-processing
	npm run build

clean:
	rm -rf dist src/app/domain/gen-* src/assets/gen-*

# utils
src/gen-nodejs:
	thrift -r -gen js:node,runtime_package=woody_js/src/client/gen -o ./src/app/thrift ./node_modules/damsel/proto/domain_config.thrift

src/gen-json:
	thrift -r -gen json -o ./src/assets ./node_modules/damsel/proto/domain_config.thrift

thrift-to-js/payment-processing:
	thrift -r -gen js:node,runtime_package=woody_js/dist/thrift -o ./src/app/thrift ./node_modules/damsel/proto/payment_processing.thrift

lint:
	npm run lint
