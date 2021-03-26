import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';
import * as del from 'del';

import * as configDefinition from '../thrift-config.json';

const ROOT_DIR = path.join(__dirname, '..');
const BASE_OUTPUT_PATH = './src/app/api';
const OUTPUT_TS_DIR_NAME = 'gen-model';
const OUTPUT_JSON_META_DIR_NAME = 'gen-metadata';

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

async function execute(cmd: string, cwd = ROOT_DIR) {
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

async function compileNamespace(
    { namespace, baseUrl, services }: NamespaceDefinition,
    baseOutputPath = BASE_OUTPUT_PATH,
    outputTsDirName = OUTPUT_TS_DIR_NAME,
    outputJsonMetaDirName = OUTPUT_JSON_META_DIR_NAME
) {
    log(chalk.bold(`Namespace ${namespace} compilation started`));

    const namespaceOutputPath = path.join(baseOutputPath, namespace);
    const outputTsDefinitionsDir = path.join(namespaceOutputPath, outputTsDirName);
    const outputJsonMetadataDir = path.join(namespaceOutputPath, outputJsonMetaDirName);
    const outputServicesDirs = [];
    for (const serviceDef of services) {
        outputServicesDirs.push(path.join(namespaceOutputPath, serviceDef.name));
    }

    await del([outputTsDefinitionsDir, outputJsonMetadataDir, ...outputServicesDirs]);

    mkdirIfNotExist(namespaceOutputPath);
    for (const outputServicesDir of outputServicesDirs) {
        mkdirIfNotExist(outputServicesDir);
    }

    await compileTsDefinitions(baseUrl, outputTsDefinitionsDir);
    await compileJsonMetadata(baseUrl, path.join(outputJsonMetadataDir, `${namespace}-meta.json`));
    await compileServices(baseUrl, namespaceOutputPath, services);

    log(chalk.bold(`Namespace ${namespace} compilation finished`));
}

async function compile(definitions: NamespaceDefinition[]) {
    for (const def of definitions) {
        await compileNamespace(def);
    }
}

async function run() {
    log(chalk.bold.bgMagenta('Thrift services compilation started'));
    try {
        const config = configDefinition.config as any;
        await compile(config);
        log(chalk.bold.bgGreen('Thrift services compilation finished'));
    } catch (e) {
        console.error(e);
        error(chalk.bold.bgRed('Thrift services compilation failed'));
    }
}

run();
