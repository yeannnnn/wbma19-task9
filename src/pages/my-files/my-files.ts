import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { User } from '../../interfaces/user';
import { Pic, DeleteResponse } from '../../interfaces/pic';
import { PlayerPage } from '../player/player';
import { ModifyPage } from '../modify/modify';

/**
 * Generated class for the MyFilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-files',
  templateUrl: 'my-files.html',
})
export class MyFilesPage {

  user: User;
  mediaArray: Pic[] = [];
  pic: Pic;
  message: DeleteResponse;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyFilesPage');
    this.getFiles();
  }

  getFiles(){
    this.mediaProvider.getUserMedia().subscribe(
      (response: Pic[]) => {
        console.log(response);
        this.mediaArray = response;
      });
  }

  viewItem(image) {
    this.navCtrl.push(PlayerPage, {
      image: image
    });
    console.log(image);
  }

  deleteItem(id){
    this.mediaProvider.deleteMedia(id).subscribe(
      (response: DeleteResponse) => {
        console.log(response);
        console.log('File ID: ' + id + ' deleted');
      })
    this.getFiles();
  }

  modifyItem(image){
    this.navCtrl.push(ModifyPage, {
      image: image
    });
    console.log(image)
  }
  
}
