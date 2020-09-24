import { exec } from 'child_process';
import * as del from 'del';
import { glob } from 'glob';
import * as path from 'path';

import * as config from '../thrift-config.json';

const ROOT_DIR = path.join(__dirname, '..');
const THRIFT_PATH = 'woody_js/dist/thrift';

const OUTPUT_PATH = './src/app/thrift-services';
const GEN_MODEL_DIR = 'gen-model';
const GEN_CLIENT_DIR = 'gen-nodejs';
const META_PATH = 'src/assets';

async function execWithLog(cmd: string) {
    console.log(`> ${cmd}`);
    return await new Promise<string>((res, rej) =>
        exec(
            cmd,
            {
                cwd: ROOT_DIR,
            },
            (error, stdout, stderr) => {
                if (error === null) {
                    console.log(stderr);
                    res(stdout);
                } else {
                    console.error(error);
                    console.error(stderr);
                    rej(error);
                }
            }
        )
    );
}

async function genClient(name: string, thriftPath: string) {
    const out = path.join(OUTPUT_PATH, name);
    await del([path.join(OUTPUT_PATH, GEN_CLIENT_DIR)]);
    return await execWithLog(
        `thrift -r -gen js:node,runtime_package=${THRIFT_PATH} -o ${out} ${thriftPath};`
    );
}

async function genModel(name: string, protoPath: string) {
    const out = path.join(OUTPUT_PATH, name, GEN_MODEL_DIR);
    await del([path.join(OUTPUT_PATH, GEN_MODEL_DIR)]);
    return await execWithLog(`thrift-ts ${protoPath} -o ${out} -d false`);
}

async function genMeta(name: string, protoPath: string) {
    const out = path.join(META_PATH, `meta-${name}.json`);
    await del([out]);
    return await execWithLog(`thrift-ts ${protoPath} -o ${out} --json --pack --prettify`);
}

async function compileProto(protoName: string, proto: string | { path: string; meta: boolean }) {
    let protoPath: string;
    let withMeta = false;
    if (typeof proto === 'object') {
        protoPath = proto.path;
        withMeta = proto.meta;
    } else {
        protoPath = proto;
    }

    const globPattern = path.join(`${protoPath}/**/*.thrift`);
    const thriftFiles = await new Promise<string[]>((res, rej) =>
        glob(globPattern, {}, (err, files) => {
            if (err) {
                rej(err);
            }
            res(files);
        })
    );

    console.log(`Compile ${protoName}: ${protoPath}`);
    const genList: Promise<any>[] = [];
    genList.push(genModel(protoName, protoPath));
    if (withMeta) {
        genList.push(genMeta(protoName, protoPath));
    }
    for (const f of thriftFiles) {
        genList.push(genClient(protoName, f));
    }
    await Promise.all(genList);
}

async function compileProtos() {
    try {
        await Promise.all(
            Object.entries(config.proto).map(([protoName, proto]) => compileProto(protoName, proto))
        );
        console.log('Generated');
    } catch (e) {
        console.error(e);
        console.error('Not generated');
        throw e;
    }
}

compileProtos();
