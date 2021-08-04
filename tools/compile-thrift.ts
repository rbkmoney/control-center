import * as chalk from 'chalk';
import { exec } from 'child_process';
import * as del from 'del';
import * as fs from 'fs';
import * as path from 'path';

import * as configDefinition from '../thrift-config.json';

const log = console.log;
const error = console.error;

interface ServiceDefinition {
    definitionFile: string;
    outputFolder: string;
}

interface NamespaceDefinition {
    namespace: string;
    baseUrl: string;
    services: ServiceDefinition[];
}

interface PathsConfig {
    outputNamespacePath: string;
    model: {
        definitionsFolder: string;
        outputFolder: string;
    };
    services: {
        definitionFile: string;
        outputFolder: string;
    }[];
    meta: {
        definitionsFolder: string;
        outputFile: string;
    };
}

async function execute(cmd: string, cwd = path.join(__dirname, '..')) {
    return await new Promise<string>((res, rej) =>
        exec(
            cmd,
            {
                cwd,
            },
            (error, stdout, stderr) => {
                if (error === null) {
                    res(stdout);
                } else {
                    rej(stderr);
                }
            }
        )
    );
}

function mkdirIfNotExist(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

async function compileTsDefinitions(definitionsPath: string, outputPath: string) {
    try {
        log('Compiling typescript definition');
        await execute(`thrift-ts ${definitionsPath} -o ${outputPath} -d false`);
    } catch (err) {
        log(`Typescript definition ${chalk.red('compilation failed')}`);
        throw err;
    }
}

async function compileJsonMetadata(definitionsPath: string, outputFilePath: string) {
    try {
        log('Compiling JSON metadata');
        await execute(`thrift-ts ${definitionsPath} -o ${outputFilePath} --json --pack --prettify`);
    } catch (err) {
        log(`JSON metadata ${chalk.red('compilation failed')}`);
        throw err;
    }
}

async function compileService(definitionFilePath: string, outputPath: string) {
    try {
        log(`Compiling service: ${definitionFilePath}`);
        await execute(
            `thrift -r -gen js:node,runtime_package=@rbkmoney/woody_js/dist/thrift -o ${outputPath} ${definitionFilePath};`
        );
    } catch (err) {
        log(`Service: ${definitionFilePath} ${chalk.red('compilation failed')}`);
        throw err;
    }
}

function toPathConfig(
    { baseUrl, namespace, services }: NamespaceDefinition,
    baseOutputPath = 'src/app/api',
    outputModelDirName = 'gen-model',
    baseOutputMetaPath = 'src/assets/api-meta'
): PathsConfig {
    const outputNamespacePath = path.join(baseOutputPath, namespace);
    return {
        outputNamespacePath,
        model: {
            definitionsFolder: baseUrl,
            outputFolder: path.join(outputNamespacePath, outputModelDirName),
        },
        services: services.map(({ definitionFile, outputFolder }) => ({
            definitionFile: path.join(baseUrl, definitionFile),
            outputFolder: path.join(outputNamespacePath, outputFolder),
        })),
        meta: {
            definitionsFolder: baseUrl,
            outputFile: path.join(baseOutputMetaPath, `${namespace}.json`),
        },
    };
}

async function clear({ model, meta, services }: PathsConfig, outputServiceDirName = 'gen-nodejs') {
    await del([
        model.outputFolder,
        ...services.map((s) => path.join(s.outputFolder, outputServiceDirName)),
        meta.outputFile,
    ]);
}

function prepareOutputDirs({ services, outputNamespacePath }: PathsConfig) {
    mkdirIfNotExist(outputNamespacePath);
    for (const service of services) {
        mkdirIfNotExist(service.outputFolder);
    }
}

async function compileNamespace(namespaceDefinition: NamespaceDefinition) {
    log(
        chalk.cyan(
            `Namespace ${chalk.bold.cyan(namespaceDefinition.namespace)} compilation started`
        )
    );
    const pathsConfig = toPathConfig(namespaceDefinition);
    await clear(pathsConfig);
    prepareOutputDirs(pathsConfig);
    await compileTsDefinitions(pathsConfig.model.definitionsFolder, pathsConfig.model.outputFolder);
    for (const config of pathsConfig.services) {
        await compileService(config.definitionFile, config.outputFolder);
    }
    await compileJsonMetadata(pathsConfig.meta.definitionsFolder, pathsConfig.meta.outputFile);
}

async function compile(definitions: NamespaceDefinition[]) {
    try {
        log(chalk.bold.magenta('Thrift services compilation started'));
        for (const def of definitions) {
            await compileNamespace(def);
        }
        log(chalk.bold.green('Thrift services compilation finished'));
    } catch (e) {
        error(e);
        error(chalk.bold.red('Thrift services compilation failed'));
        process.exit(1);
    }
}

compile(configDefinition.config);
