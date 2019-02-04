import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Media } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs';
import { UploadPage } from '../upload/upload';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  mediaArray: Observable<Media[]>;
  mediaFilePath = 'https://media.mw.metropolia.fi/wbma/uploads/';
  // picArray: Pic[] = []; // Pic[] = [] if get error push dont exist
  // picArray2: Observable<Pic[]>;
  // uploadUrl = 'https://media.mw.metropolia.fi/wbma/uploads/'; // links don't need a type

  constructor(
    public navCtrl: NavController,
    public photoViewer: PhotoViewer,
    public http: HttpClient,
    public mediaProvider: MediaProvider) {

  }

  goToUpload() {
    this.navCtrl.push(UploadPage);
  }

  // showImage(image) {
  //   this.photoViewer.show(image);
  // }

  showImage(fileId: number) {   // (image)
    // this.photoViewer.show(image);
    this.mediaProvider.getSingleMedia(fileId).subscribe(result => {
      console.log(result);
    }, error => {
        console.log(error);
      },
    );
  }

  getAllFiles() {
    this.mediaArray = this.mediaProvider.getAllMedia();
  }

  ionViewDidEnter() {    // ngOnInit(){
    this.getAllFiles();
    // this.getAllFiles2();
  }

/*
  getAllFiles1() {
     this.mediaProvider.getAllMedia().subscribe((data: Media[]) => {
      console.log('data', data);
      /* providers A:
      this.picArray = data.map((pic: Pic) => {
        // add thumbnails property to pic
        const nameArray = pic.filename.split('.');
        console.log('nameArray', nameArray);
        pic.thumbnails = {
          160: nameArray[0] + '-tn160.png',
        };
        console.log('pic after', pic);
        return pic;
      });
      */
      // providers B:
  //     data.forEach((media: Media) => {
  //       //add files to picArray
  //      this.mediaProvider.getSingleMedia(media.file_id).
  //        subscribe((file: Media) => {
  //          this.mediaArray.push(file);
  //        });
  //
  //    });
  //   });
  //
  // }

  /*
    getAllFiles2() {
      this.picArray2 = this.mediaProvider.getAllMedia();
      console.log(this.picArray2);
    }
  */


}
