import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { ThemeName } from './types/theme-name';
import { createStyleElement } from './utils/create-style-element';

const THEME_POSTFIX = 'theme';

@Injectable()
export class ThemeManager {
    current: ThemeName;

    private element: HTMLScriptElement | HTMLLinkElement;

    constructor(@Inject(DOCUMENT) private doc: Document) {
        this.change(ThemeName.Light);
    }

    change(name: ThemeName): void {
        this.removeCurrent();
        this.set(name);
    }

    private set(name: ThemeName) {
        this.element = createStyleElement(`${name}-${THEME_POSTFIX}.css`);
        this.doc.head.appendChild(this.element);
        this.doc.body.classList.add(name);
        this.current = name;
    }

    private removeCurrent() {
        if (this.doc.head.contains(this.element)) this.doc.head.removeChild(this.element);
        this.doc.body.classList.remove(this.current);
    }
}
