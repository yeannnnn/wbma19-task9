import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';

import { Observable } from 'rxjs';
import { LoginResponse, Media, User } from '../../interfaces/pic';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  mediaArray: Observable<Media>;
  user: User;
  id;
  mediaFilePath = 'https://media.mw.metropolia.fi/wbma/uploads/';

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }

  getFiles() {

    this.mediaProvider.login(this.user).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        this.id = response.user_id;
      });
    this.mediaArray = this.mediaProvider.getSingleMedia(this.id);
  }

  logout() {
    localStorage.clear();
    this.mediaProvider.logged = false;
    console.log('Clear');
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  ngOnInit() {
    this.getFiles();
    // this.getAllFiles2();
  }
}
