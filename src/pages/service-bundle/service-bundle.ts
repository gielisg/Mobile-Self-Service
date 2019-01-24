import { Component, ViewChild } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { TranslateProvider } from '../../providers/translate/translate';


/**
 * Generated class for the ServiceBundlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-bundle',
  templateUrl: 'service-bundle.html',
})
export class ServiceBundlePage {

  @ViewChild('barCanvas') barCanvas;
  barChart: any;


  id = 'AngularChart2';
  width = "100%";
  height = 300;
  type = 'pie2d';
  dataFormat = 'json';
  dataSource;
  public myJson;


  // Pie
  public pieChartLabels: string[] = ['Non/Usage', 'Calls', 'Data', 'SMS/MMS'];
  public pieChartData: number[] = [500, 190, 300, 120];
  public pieChartType: string = 'pie';

  public pieChartOptions: any = {
    animate: true,
    offset: 25,
    sliceOffset: 0,
    labelOffset: 3,
    type: 'stacked',
    hoveredColor: '#9fd4ff',
    showLabels: true,
    resizeLabels: false,
    updateHeights: false,
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public toast: ToastProvider,
    public translate: TranslateProvider,
  ) {
    this.dataSource = {
      "chart": {
        "theme": "fint",
        "text": "asdfasdf"
      },
      "data": [{
        "label": "Non/Usage",
        "value": 500
      },
      {
        "label": "Calls",
        "value": 190
      },
      {
        "label": "Data",
        "value": 300
      },
      {
        "label": "SMS/MMS",
        "value": 120
      }
      ]
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceBundlePage');
    this.ionicInit();

  }

  goback() {
    this.navCtrl.pop();
  }

  ionicInit() {
    this.translate.translaterService();
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
