import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';
import * as del from 'del';

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
    const logMessage = `Typescript definition for: ${definitionsPath}`;
    try {
        await execute(`thrift-ts ${definitionsPath} -o ${outputPath} -d false`);
        console.log(`${logMessage} ${chalk.green('compiled')}`);
    } catch (err) {
        console.log(`${logMessage} ${chalk.red('compilation failed')}`);
        throw err;
    }
}

async function compileJsonMetadata(definitionsPath: string, outputFilePath: string) {
    const logMessage = `JSON metadata for: ${definitionsPath}`;
    try {
        await execute(`thrift-ts ${definitionsPath} -o ${outputFilePath} --json --pack --prettify`);
        console.log(`${logMessage} ${chalk.green('compiled')}`);
    } catch (err) {
        console.log(`${logMessage} ${chalk.red('compilation failed')}`);
        throw err;
    }
}

async function compileService(definitionFilePath: string, outputPath: string) {
    const logMessage = `Service for: ${definitionFilePath}`;
    try {
        await execute(
            `thrift -r -gen js:node,runtime_package=woody_js/dist/thrift -o ${outputPath} ${definitionFilePath};`
        );
        console.log(`${logMessage} ${chalk.green('compiled')}`);
    } catch (err) {
        console.log(`${logMessage} ${chalk.red('compilation failed')}`);
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

async function clear({ model, meta, services }: PathsConfig) {
    await del([model.outputFolder, ...services.map((s) => s.outputFolder), meta.outputFile]);
}

function prepareOutputDirs({ model, services, outputNamespacePath }: PathsConfig) {
    mkdirIfNotExist(outputNamespacePath);
    for (const service of services) {
        mkdirIfNotExist(service.outputFolder);
    }
}

async function compileNamespace(namespaceDefinition: NamespaceDefinition) {
    log(chalk.bold(`Namespace ${namespaceDefinition.namespace} compilation started`));
    const pathsConfig = toPathConfig(namespaceDefinition);
    await clear(pathsConfig);
    prepareOutputDirs(pathsConfig);
    await compileTsDefinitions(pathsConfig.model.definitionsFolder, pathsConfig.model.outputFolder);
    for (const config of pathsConfig.services) {
        await compileService(config.definitionFile, config.outputFolder);
    }
    await compileJsonMetadata(pathsConfig.meta.definitionsFolder, pathsConfig.meta.outputFile);
    log(chalk.bold(`Namespace ${namespaceDefinition.namespace} compilation finished`));
}

async function compile(definitions: NamespaceDefinition[]) {
    try {
        log(chalk.bold.bgMagenta('Thrift services compilation started'));
        for (const def of definitions) {
            await compileNamespace(def);
        }
        log(chalk.bold.bgGreen('Thrift services compilation finished'));
    } catch (e) {
        console.error(e);
        error(chalk.bold.bgRed('Thrift services compilation failed'));
    }
}

compile(configDefinition.config as any);
