import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillHistoryPage } from './bill-history';

@NgModule({
  declarations: [
    BillHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(BillHistoryPage),
  ],
})
export class BillHistoryPageModule {}
