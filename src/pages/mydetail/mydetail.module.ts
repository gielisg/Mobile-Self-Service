import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MydetailPage } from './mydetail';

@NgModule({
  declarations: [
    MydetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MydetailPage),
  ],
})
export class MydetailPageModule {}
