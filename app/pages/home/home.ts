import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  data: any;
  url: string;
  alertTitle: string;
  alertSubTitle: string;

  constructor(public navCtrl: NavController, private http:Http, public alertCtrl : AlertController) {
    this.url = 'http://dev.valentincrochemore.fr/connected';
    this.alertTitle = ':( un problème est survenu'
    this.alertSubTitle = 'Il semblerait qu\'un problème est survenu.\n Vérifiez que la 3G/4G/Wifi soit bien activée'
    this.http.get(this.url).map(res => res.json()).subscribe(data => {
        this.data = data;
        if (data.length === 0) {
          this.data = undefined;
        }
      },
      err => {
        let alert = this.alertCtrl.create({
          title: this.alertTitle,
          subTitle: this.alertSubTitle,
          buttons: ['OK']
        });
        alert.present();
      });
  }

  doRefresh(refresher) {
    this.http.get(this.url).map(res => res.json()).subscribe(data => {
        this.data = data;
        if (data.length === 0) {
          this.data = undefined;
        }
        refresher.complete();
      },
      err => {
        let alert = this.alertCtrl.create({
          title: this.alertTitle,
          subTitle: this.alertSubTitle,
          buttons: ['OK']
        });
        alert.present();
      });
    console.log('Refreshing!', refresher);
  }
}
