import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeStatusPage } from './change-status';

@NgModule({
  declarations: [
    ChangeStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeStatusPage),
  ],
})
export class ChangeStatusPageModule {}
