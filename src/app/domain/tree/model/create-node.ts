import { Params } from './node';
import { Const, Enum, Exception, MetaList, MetaMap, MetaSet, Simple, Struct, Type, TypeDef, Union } from '../../../metadata/metadata.service';
import { EnumNode } from './typed-nodes/enum-node';
import { ExceptionNode, StructNode } from './typed-nodes/struct-node';
import { UnionNode } from './typed-nodes/union-node';
import { ListNode, SetNode } from './typed-nodes/list-node';
import { MapNode } from './typed-nodes/map-node';
import { BoolNode } from './typed-nodes/bool-node';
import { DoubleNode, I64Node, IntNode, StringNode } from './typed-nodes/simple-node';
import { ConstNode } from './typed-nodes/const-node';
import { BinaryNode } from './typed-nodes/binary-node';

export function createNode(params: Params<Type> = {}) {
    const structure = params.metadata ? params.metadata.structure : params.parent.metadata.structure;
    switch (structure) {
        case 'typedef':
            return createNode({...params, metadata: (params.metadata as TypeDef).type});
        case 'const':
            return new ConstNode(params as Params<Const>);
        case 'enum':
            return new EnumNode(params as Params<Enum>);
        case 'struct':
            return new StructNode(params as Params<Struct>);
        case 'union':
            return new UnionNode(params as Params<Union>);
        case 'exception':
            return new ExceptionNode(params as Params<Exception>);
        case 'list':
            return new ListNode(params as Params<MetaList>);
        case 'set':
            return new SetNode(params as Params<MetaSet>);
        case 'map':
            return new MapNode(params as Params<MetaMap>);
        case 'bool':
            return new BoolNode(params as Params<Simple>);
        case 'int':
        case 'i8':
        case 'i16':
        case 'i32':
            return new IntNode(params as Params<Simple>);
        case 'i64':
            return new I64Node(params as Params<Simple>);
        case 'double':
            return new DoubleNode(params as Params<Simple>);
        case 'string':
            return new StringNode(params as Params<Simple>);
        case 'binary':
            return new BinaryNode(params as Params<Simple>);
    }
    throw new Error('Unknown structure');
}

