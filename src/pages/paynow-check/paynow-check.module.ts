import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaynowCheckPage } from './paynow-check';

@NgModule({
  declarations: [
    PaynowCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(PaynowCheckPage),
  ],
})
export class PaynowCheckPageModule {}
