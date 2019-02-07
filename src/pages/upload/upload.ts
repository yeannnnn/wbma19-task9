import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  filedata = '';
  file: File;
  type = '';
  title = '';
  description = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  handleChange($event) {
    // console.log($event.target.files[0]);
    // get the file from $event
    this.file = $event.target.files[0];
    // call showPreview
    this.showPreview();
  }

  showPreview() {
    // show selected image in img
    const reader = new FileReader();
    reader.onloadend = (evt) => {   // use the arrow function, so that the "this." will stay the same
      // console.log(reader.result);
      this.filedata = reader.result; // save the result in filedata(variable)
    };
    // if media is audio or video use some default image
    if (this.file.type.includes('video')) {
      this.filedata = 'http://via.placeholder.com/500X200/000?text=Video';
    } else if (this.file.type.includes('audio')) {
      this.filedata = 'http://via.placeholder.com/500X200/000?text=Audio';
    } else {
      reader.readAsDataURL(this.file);   // start load the file, when the load done, console.log above. //this is also what we need to upload
    }
  }

  upload() {
    // const desc = `<description>${this.description}</description>`;
    const filter = '<filters>filtersAsText</filters>';   // Save filter settings as tag or part of the description when file is uploaded
    // show spinner
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('description', this.description + filter); // desc + filter
    fd.append('file', this.file);
    this.mediaProvider.upload(fd).subscribe(resp => {
      console.log(resp);
      // setTimeout 2. secs
      this.navCtrl.pop().catch(); // add catch() just to fix the pop's link error
      // hide spinner

    });
  }
}
