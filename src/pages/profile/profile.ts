import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';

import { Observable } from 'rxjs';
import { LoginResponse, Media, User } from '../../interfaces/media';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'profile.html',
})
export class LogoutPage {
  avatar;
  url = 'https://media.mw.metropolia.fi/wbma/uploads/';
  mediaArray: Media[];


  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }


  logout() {
    localStorage.clear();
    this.mediaProvider.logged = false;
    console.log('Clear');
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');

    this.mediaProvider.getSingleMedia(28).subscribe((response: Media) =>{
      this.avatar = response.filename;
    });
  }

}
