import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Media } from '../../interfaces/pic';



/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
  // pure: false   // for inpure version
})

export class ThumbnailPipe implements PipeTransform {
  private thumbnail = '';
  private cachedId;
  constructor(private mediaProvider: MediaProvider) {

  }

  async transform(id: number, ...args) {
    console.log(args[0]);
    /*
    //inpure version:
    if (this.cachedId !== id) {
      // this.thumbnail = null;
      this.cachedId = id;
      this.mediaProvider.getSingleMedia(id).subscribe((response: Media) => {
        // this.thumbnail = response.thumbnails.w160;
        switch (args[0]) {
          case 'large':
            this.thumbnail = response.thumbnails.w640;
            break;
          case 'medium':
            this.thumbnail = response.thumbnails.w320;
            break;
          case 'screenshot':
            this.thumbnail = response.screenshot;
            break;
          default :
            this.thumbnail = response.thumbnails.w160;
            break;
        }
      });
      return this.thumbnail;

    }
    /*
    this.mediaProvider.getSingleMedia(id).subscribe((response: Media) => {
      this.thumbnail = response.thumbnails.w160;

    });
    return this.thumbnail;
    */
    // console.log('pipe', id);
    // return id + 10000000;
/*  }
}
*/

// pure version:
    return new Promise((resolve, reject) => {
    this.mediaProvider.getSingleMedia(id).subscribe((response: Media) => {
    // this.thumbnail = response.thumbnails.w160;
    switch (args[0]) {
      case 'large':
        resolve(response.thumbnails.w640);
        break;
      case 'medium':
        resolve(response.thumbnails.w320);
        break;
      case 'screenshot':
        resolve(response.screenshot);
        break;
      default :
        resolve(response.thumbnails.w160);
        break;
    }
  });
});

}
}
