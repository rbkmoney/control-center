import { JsonAST } from 'thrift-ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ASTDefinition {
    path: string;
    name: string;
    ast: JsonAST;
}
