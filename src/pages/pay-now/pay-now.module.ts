import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayNowPage } from './pay-now';

@NgModule({
  declarations: [
    PayNowPage,
  ],
  imports: [
    IonicPageModule.forChild(PayNowPage),
  ],
})
export class PayNowPageModule {}
