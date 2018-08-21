# Control Center

Компиляция thrift:

    make wc_shell

    thrift -r -gen js:node,runtime_package=woody_js/dist/thrift -o ./src/app/domain ./node_modules/damsel/proto/domain_config.thrift

    thrift -r -gen json -o ./src/assets ./node_modules/damsel/proto/domain_config.thrift
