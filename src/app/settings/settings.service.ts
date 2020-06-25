import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
    set(key: string, value: string) {
        localStorage.setItem(this.getKeyName(key), value);
    }

    setAll(keyValue: { [name: string]: string }) {
        for (const [k, v] of Object.entries(keyValue)) {
            this.set(k, v);
        }
    }

    get(key: string): string {
        return localStorage.getItem(this.getKeyName(key));
    }

    private getKeyName(name: string) {
        return `cc-${name}`;
    }
}
