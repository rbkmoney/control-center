import { camelCase, snakeCase, isArray, forIn } from 'lodash';

export class ThriftFormatter {

    public static decode(thrift): any | any[] {
        let result;
        if (isArray(thrift)) {
            result = [];
            for (const item of thrift) {
                if (typeof item === 'object') {
                    result.push(ThriftFormatter.decode(item));
                }
            }
        } else {
            result = {};
            forIn(thrift, (value, key) => {
                if (typeof value === 'object') {
                    result[camelCase(key)] = ThriftFormatter.decode(value);
                } else {
                    result[camelCase(key)] = value;
                }
            });
        }
        return result;
    }

    public static encode(model): any | any[] {
        let result;
        if (isArray(model)) {
            result = ['list'];
            for (const item of model) {
                if (typeof item === 'object') {
                    result.push(ThriftFormatter.encode(item));
                }
            }
        } else {
            result = {};
            forIn(model, (value, key) => {
                if (typeof value === 'object') {
                    result[snakeCase(key)] = ThriftFormatter.encode(value);
                } else {
                    result[snakeCase(key)] = value;
                }
            });
        }

        return result;
    }
}
