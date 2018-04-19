import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewpaymentCheckPage } from './newpayment-check';

@NgModule({
  declarations: [
    NewpaymentCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(NewpaymentCheckPage),
  ],
})
export class NewpaymentCheckPageModule {}
