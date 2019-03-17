import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { User } from '../../interfaces/user';
import { MyFilesPage } from '../my-files/my-files';
 
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
export class ProfilePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout(){
    localStorage.clear();
    this.mediaProvider.loggedIn = false;
    this.navCtrl.push(HomePage);
  }

  myUploads(){
    this.navCtrl.push(MyFilesPage);
  }

  /*
  getAvatar() {
    this.mediaProvider.getSingleMedia(x.file_id).
    subscribe((file: Tag) =>{
     this.picArray.push(file);
  }
  */

}
