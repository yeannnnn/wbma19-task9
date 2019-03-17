import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interfaces/pic';
import { User } from '../../interfaces/user';

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

  image_type = false;
  video_type = false;
  audio_type = false;

  media: Pic;
  user: User;
  username: String;

  url = "https://media.mw.metropolia.fi/wbma/uploads/";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider) {
      this.media = this.navParams.get('image');
      console.log(this.media.file_id);
      //console.log(this.media.user_id);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
    this.getUsername();
    this.mediaType();
  }

  getUsername(){
    this.mediaProvider.getUserById(this.media.user_id).subscribe(
      (response: User) => {
        console.log(response);
        this.user = response;
        this.username = response.username;
        console.log(response.username);
      });
  }

  mediaType() {
    console.log(this.media.media_type);
    if(this.media.media_type == 'image'){
      this.image_type = true;
      console.log('image');
    }
    else if(this.media.media_type == 'video'){
      this.video_type = true;
      console.log('video');
    }
    else if(this.media.media_type == 'audio'){
      this.audio_type = true;
      console.log('audio');
    }
  }
}
