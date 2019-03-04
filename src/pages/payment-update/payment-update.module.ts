import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentUpdatePage } from './payment-update';

@NgModule({
  declarations: [
    PaymentUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentUpdatePage),
  ],
})
export class PaymentUpdatePageModule {}
