import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Pic, DeleteResponse } from '../../interfaces/pic';
import { MyFilesPage } from '../my-files/my-files';

/**
 * Generated class for the ModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify',
  templateUrl: 'modify.html',
})
export class ModifyPage {

  title = '';
  description = '';
  media: Pic;
  url = "https://media.mw.metropolia.fi/wbma/media/";
  modify = {
    "title": "",
    "description": ""
  }
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public loadingCtrl: LoadingController) {
                this.media = this.navParams.get('image');
                console.log(this.media.file_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPage');
  }

  update(){
    console.log(this.modify);
    this.mediaProvider.updateFile(this.media.file_id, this.modify).subscribe(
      (response: DeleteResponse) => {
        console.log(response);
      });
      this.navCtrl.push(MyFilesPage);
  }

}
