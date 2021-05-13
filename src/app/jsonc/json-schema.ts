// eslint-disable-next-line @typescript-eslint/naming-convention
export interface JSONSchema {
    id?: string;
    $schema?: string;
    type?: string | string[];
    title?: string;
    default?: any;
    definitions?: JSONSchemaMap;
    description?: string;
    properties?: JSONSchemaMap;
    patternProperties?: JSONSchemaMap;
    additionalProperties?: boolean | JSONSchema;
    minProperties?: number;
    maxProperties?: number;
    dependencies?: JSONSchemaMap | string[];
    items?: JSONSchema | JSONSchema[];
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
    additionalItems?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: boolean;
    exclusiveMaximum?: boolean;
    multipleOf?: number;
    required?: string[];
    $ref?: string;
    anyOf?: JSONSchema[];
    allOf?: JSONSchema[];
    oneOf?: JSONSchema[];
    not?: JSONSchema;
    enum?: any[];
    format?: string;

    defaultSnippets?: { label?: string; description?: string; body: any }[]; // VSCode extension
    errorMessage?: string; // VSCode extension
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface JSONSchemaMap {
    [name: string]: JSONSchema;
}
