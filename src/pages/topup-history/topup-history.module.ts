import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopupHistoryPage } from './topup-history';

@NgModule({
  declarations: [
    TopupHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TopupHistoryPage),
  ],
})
export class TopupHistoryPageModule {}
