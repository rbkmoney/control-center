import { JsonAST, Enums, Field, Structs, Unions, TypeDefs } from 'thrift-ts';

import {
    ASTDefinition,
    MetaTyped,
    MetaEnum,
    MetaType,
    MetaField,
    MetaStruct,
    MetaUnion,
    MetaTypedef
} from '../model';
import { isRef } from './utils';
import { resolveAstValueType } from './resolve-ast-value-type';
import { MetaGroup } from './model';

const resolveAstField = ({ option, name, type }: Field): MetaField => ({
    required: option ? option === 'required' : false,
    name,
    meta: resolveAstValueType(type)
});

const resolveAstFields = (fields: Field[]): MetaField[] => fields.map(f => resolveAstField(f));

const resolveAstEnums = (ast: Enums): MetaEnum[] =>
    Object.keys(ast).map(name => ({
        type: MetaType.enum,
        name,
        items: ast[name].items
    }));

const resolveAstStructs = (ast: Structs, namespace: string): MetaStruct[] =>
    Object.keys(ast).map(name => ({
        type: MetaType.struct,
        name,
        fields: resolveAstFields(ast[name]),
        isRef: isRef(name),
        namespace,
        virgin: true
    }));

const resolveAstUnion = (ast: Unions, namespace: string): MetaUnion[] =>
    Object.keys(ast).map(name => ({
        type: MetaType.union,
        name,
        fields: resolveAstFields(ast[name]),
        settedField: null,
        namespace,
        virgin: true
    }));

const resolveAstTypedef = (ast: TypeDefs): MetaTypedef[] =>
    Object.keys(ast).map(name => ({
        type: MetaType.typedef,
        name,
        meta: resolveAstValueType(ast[name].type)
    }));

function resolveJsonAst(ast: JsonAST, namespace: string): MetaTyped[] {
    let r = [];
    if (ast.enum) {
        r = [...r, ...resolveAstEnums(ast.enum)];
    }
    if (ast.struct) {
        r = [...r, ...resolveAstStructs(ast.struct, namespace)];
    }
    if (ast.union) {
        r = [...r, ...resolveAstUnion(ast.union, namespace)];
    }
    if (ast.typedef) {
        r = [...r, ...resolveAstTypedef(ast.typedef)];
    }
    return r;
}

export function buildInitialMeta(astDef: ASTDefinition[]): MetaGroup[] {
    if (!astDef || astDef.length === 0) {
        return;
    }
    return astDef.reduce(
        (r, { name, ast }) => [
            ...r,
            {
                namespace: name,
                meta: resolveJsonAst(ast, name)
            }
        ],
        []
    );
}
