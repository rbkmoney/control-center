import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';
import * as del from 'del';

import * as configDefinition from '../thrift-config.json';

const log = console.log;
const error = console.error;

interface ServiceDefinition {
    name: string;
    file: string;
}

interface NamespaceDefinition {
    namespace: string;
    baseUrl: string;
    services: ServiceDefinition[];
}

interface OutputPathsConfig {
    namespaceOutputPath: string;
    tsDefinitionsDir: string;
    jsonMetadataDir: string;
    servicesDirs: string[];
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

async function compileServices(
    definitionsPath: string,
    namespaceOutputPath: string,
    services: ServiceDefinition[]
) {
    for (const serviceDef of services) {
        await compileService(
            path.join(definitionsPath, serviceDef.file),
            path.join(namespaceOutputPath, serviceDef.name)
        );
    }
}

function toOutputPaths(
    namespaceName: string,
    services: ServiceDefinition[],
    baseOutputPath = './src/app/api',
    outputTsDirName = 'gen-model',
    outputJsonMetaDirName = 'gen-metadata'
): OutputPathsConfig {
    const namespaceOutputPath = path.join(baseOutputPath, namespaceName);
    const tsDefinitionsDir = path.join(namespaceOutputPath, outputTsDirName);
    const jsonMetadataDir = path.join(namespaceOutputPath, outputJsonMetaDirName);
    const servicesDirs = services.reduce(
        (acc, { name }) => [...acc, path.join(namespaceOutputPath, name)],
        []
    );
    return {
        namespaceOutputPath,
        tsDefinitionsDir,
        jsonMetadataDir,
        servicesDirs,
    };
}

async function clear({ tsDefinitionsDir, jsonMetadataDir, servicesDirs }: OutputPathsConfig) {
    await del([tsDefinitionsDir, jsonMetadataDir, ...servicesDirs]);
}

function prepareOutputDirs({ namespaceOutputPath, servicesDirs }: OutputPathsConfig) {
    mkdirIfNotExist(namespaceOutputPath);
    for (const dir of servicesDirs) {
        mkdirIfNotExist(dir);
    }
}

async function compileNamespace({ namespace, baseUrl, services }: NamespaceDefinition) {
    log(chalk.bold(`Namespace ${namespace} compilation started`));
    const pathsConfig = toOutputPaths(namespace, services);
    await clear(pathsConfig);
    prepareOutputDirs(pathsConfig);
    await compileTsDefinitions(baseUrl, pathsConfig.tsDefinitionsDir);
    await compileJsonMetadata(
        baseUrl,
        path.join(pathsConfig.jsonMetadataDir, `${namespace}-meta.json`)
    );
    await compileServices(baseUrl, pathsConfig.namespaceOutputPath, services);
    log(chalk.bold(`Namespace ${namespace} compilation finished`));
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

compile(configDefinition.config);
