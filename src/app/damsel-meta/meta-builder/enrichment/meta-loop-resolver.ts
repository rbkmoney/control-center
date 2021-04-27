import {
    MetaCollection,
    MetaField,
    MetaMap,
    MetaStruct,
    MetaType,
    MetaTyped,
    MetaUnion,
} from '../../model';
import { registerError } from '../utils';

export interface ResolveLoopResult {
    resolved: MetaStruct | MetaUnion;
    errors: string[];
}

export class MetaLoopResolver {
    private resolved: (MetaStruct | MetaUnion)[] = [];
    private errors: string[] = [];

    constructor(
        private resolveContainer: (MetaStruct | MetaUnion)[],
        private loopSign: string,
        private deep = 0,
        private deepLimit = 3
    ) {}

    resolve(target: MetaStruct | MetaUnion): ResolveLoopResult {
        const result = {
            resolved: this.resolveObject(target),
            errors: this.errors,
        };
        return result;
    }

    private resolveMeta(meta: MetaTyped | string): MetaTyped | string {
        if (this.isLoop(meta)) {
            return this.findResolved(meta as string);
        }
        const metaTyped = meta as MetaTyped;
        switch (metaTyped.type) {
            case MetaType.struct:
            case MetaType.union:
                return this.resolveObject(meta as MetaUnion);
            case MetaType.collection:
                return this.resolveCollection(meta as MetaCollection);
            case MetaType.map:
                return this.resolveMap(meta as MetaMap);
            case MetaType.typedef:
                this.registerError('Unexpected meta type: typedef');
        }
        return meta;
    }

    private resolveObject(meta: MetaUnion | MetaStruct): MetaUnion | MetaStruct {
        if (this.isResolved(meta)) {
            return meta;
        }
        meta.fields = this.resolveFields(meta.fields);
        return meta;
    }

    private resolveFields(fields: MetaField[]): MetaField[] {
        for (const field of fields) {
            field.meta = this.resolveMeta(field.meta);
        }
        return fields;
    }

    private resolveMap(meta: MetaMap): MetaMap {
        meta.keyMeta = this.resolveMeta(meta.keyMeta);
        meta.valueMeta = this.resolveMeta(meta.valueMeta);
        return meta;
    }

    private resolveCollection(meta: MetaCollection): MetaCollection {
        meta.itemMeta = this.resolveMeta(meta.itemMeta);
        return meta;
    }

    private isLoop(meta: MetaTyped | string): boolean {
        return typeof meta === 'string' && meta.startsWith(this.loopSign);
    }

    private isResolved(meta: MetaUnion | MetaStruct): boolean {
        return !!this.resolved.find((i) => i.name === meta.name);
    }

    private findResolved(looped: string): MetaUnion | MetaStruct {
        const found = this.resolveContainer.find(
            (i) => i.name === looped.replace(this.loopSign, '')
        );
        if (!found) {
            this.registerError('Resolved meta not found');
        }
        if (this.deep < this.deepLimit) {
            this.deep++;
            const resolver = new MetaLoopResolver(
                this.resolveContainer,
                this.loopSign,
                this.deep,
                this.deepLimit
            );
            const { resolved, errors } = resolver.resolve(found);
            this.errors = [...this.errors, ...errors];
            this.resolved.push(resolved);
        } else {
            this.resolved.push(found);
        }
        return found;
    }

    private registerError(message: string, prefix = 'Resolve loop error'): void {
        this.errors = registerError(this.errors, message, prefix);
    }
}
