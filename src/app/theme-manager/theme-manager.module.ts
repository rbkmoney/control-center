import { NgModule } from '@angular/core';

import { SettingsModule } from '../settings';
import { ThemeManager } from './theme-manager.service';

@NgModule({
    imports: [SettingsModule],
    providers: [ThemeManager],
})
export class ThemeManagerModule {}
