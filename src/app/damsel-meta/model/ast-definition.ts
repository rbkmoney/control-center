import { JsonAST } from 'thrift-ts';

export interface ASTDefinition {
    path: string;
    name: string;
    ast: JsonAST;
}
