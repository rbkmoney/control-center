import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { SettingsService } from '../settings';
import { ThemeName } from './theme-name';

@Injectable()
export class ThemeManager {
    current: ThemeName;

    private static readonly key = 'theme';
    private element: HTMLScriptElement | HTMLLinkElement;

    constructor(private settingsService: SettingsService, @Inject(DOCUMENT) private doc: Document) {
        const name = this.settingsService.get(ThemeManager.key);
        const correctedName = this.getCorrectName(name);
        this.change(correctedName);
    }

    change(name: ThemeName) {
        this.removeCurrent();
        this.set(name);
    }

    private getCorrectName(theme: ThemeName | string): ThemeName {
        if (!Object.values<string>(ThemeName).includes(theme)) {
            return this.current || ThemeName.light;
        }
        return theme as ThemeName;
    }

    private set(name: ThemeName) {
        this.element = this.createElement(name);
        this.doc.head.appendChild(this.element);
        this.doc.body.classList.add(name);
        this.settingsService.set(ThemeManager.key, name);
        this.current = name;
    }

    private removeCurrent() {
        if (this.doc.head.contains(this.element)) {
            this.doc.head.removeChild(this.element);
        }
        this.doc.body.classList.remove(this.current);
    }

    private createElement(name: ThemeName): HTMLLinkElement | HTMLScriptElement {
        return this.createStyleElement(`themes/${name}.css`);
    }

    private createStyleElement(url: string): HTMLLinkElement {
        const styleElement = document.createElement('link');
        styleElement.href = url;
        styleElement.rel = 'stylesheet';
        return styleElement;
    }
}
