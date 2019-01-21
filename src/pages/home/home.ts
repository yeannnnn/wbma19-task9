import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';
import { MediaProvider } from '../../providers/media/media';

// import {Observable} from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  picArray: Pic[] = []; // Pic[] = [] if get error push dont exist
  // picArray2: Observable<Pic[]>;
  uploadUrl = 'https://media.mw.metropolia.fi/wbma/uploads/'; // links don't need a type

  constructor(
    public navCtrl: NavController,
    public photoViewer: PhotoViewer,
    public http: HttpClient,
    public mediaProvider: MediaProvider) {

  }

  showImage(image) {
    this.photoViewer.show(image);
  }

  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe((data: Pic[]) => {
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
      data.forEach((pic: Pic) => {
        // add files to picArray
        this.mediaProvider.getSingleMedia(pic.file_id).
          subscribe((file: Pic) => {
            this.picArray.push(file);
          });

      });
    });

  }

  /*
    getAllFiles2() {
      this.picArray2 = this.mediaProvider.getAllMedia();
      console.log(this.picArray2);
    }
  */
  ngOnInit() {
    this.getAllFiles();
    // this.getAllFiles2();
  }

}
