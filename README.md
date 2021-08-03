# Control Center

## Компиляция thrift:

```sh
make wc_shell
npm run compile
```

## Запуск Sonar'a

```sh
sonar-scanner -Dsonar.host.url=http://morphling-2.bst1.rbkmoney.net:9000 -Dsonar.sources=./src -Dsonar.projectKey=control-center -Dsonar.exclusions=src/app/gen-*/**,src/app/thrift/gen-*/**,src/app/fistful/gen-*/**,src/app/machinegun/gen-*/**,src/assets/meta-*.json
```
