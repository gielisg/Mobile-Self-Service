import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDevicesPage } from './my-devices';

@NgModule({
  declarations: [
    MyDevicesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDevicesPage),
  ],
})
export class MyDevicesPageModule {}
