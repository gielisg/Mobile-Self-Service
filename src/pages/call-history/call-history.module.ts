import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallHistoryPage } from './call-history';

@NgModule({
  declarations: [
    CallHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CallHistoryPage),
  ],
})
export class CallHistoryPageModule {}
