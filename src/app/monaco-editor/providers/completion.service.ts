import { Injectable } from '@angular/core';

import { CompletionProvider, IDisposable } from '../model';
import { ProviderRegister } from './provider-register';

@Injectable()
export class CompletionService extends ProviderRegister<CompletionProvider> {
    protected registerProvider(provider: CompletionProvider): IDisposable {
        if (!provider) {
            return;
        }
        return monaco.languages.registerCompletionItemProvider(provider.language, provider);
    }
}
