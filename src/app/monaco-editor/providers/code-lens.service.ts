import { Injectable } from '@angular/core';

import { CodeLensProvider, IDisposable } from '../model';
import { ProviderRegister } from './provider-register';

@Injectable()
export class CodeLensService extends ProviderRegister<CodeLensProvider> {
    protected registerProvider(provider: CodeLensProvider): IDisposable {
        if (!provider) {
            return;
        }
        return monaco.languages.registerCodeLensProvider(provider.language, provider);
    }
}
