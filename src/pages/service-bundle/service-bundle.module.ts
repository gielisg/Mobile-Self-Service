import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceBundlePage } from './service-bundle';

@NgModule({
  declarations: [
    ServiceBundlePage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceBundlePage),
  ],
})
export class ServiceBundlePageModule {}
