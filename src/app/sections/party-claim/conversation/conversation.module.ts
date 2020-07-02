import { NgModule } from '@angular/core';

import { ConversationComponent } from './conversation.component';
import { ItemComponent } from './item/item.component';

@NgModule({
    exports: [ConversationComponent],
    declarations: [ConversationComponent, ItemComponent],
})
export class ConversationModule {}
