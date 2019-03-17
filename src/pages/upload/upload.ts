import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  filedata = '';
  file: File;
  title = '';
  description = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  handleChange($event){
    this.file = $event.target.files[0];
    this.showPreview();
  }

  showPreview(){
    const reader = new FileReader();
    console.log(this.file);
    reader.onloadend = () =>{
      //console.log(reader.result);
      this.filedata = reader.result;
    };
    reader.readAsDataURL(this.file);
  }

upload(){
  // show spinner
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('description', this.description);
    console.log(this.file);
    fd.append('file', this.file);
    this.mediaProvider.upload(fd).subscribe(resp => {
      console.log(resp);
      this.presentLoadingDefault();
      // setTimeout 2 secs
      // hide spinner
    })
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
    });
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.pop().catch();
    }, 2000);
    
  }

}
