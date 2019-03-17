import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interfaces/pic';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
  // pipe: false
})
export class ThumbnailPipe implements PipeTransform {
  private cahchedId;
  private thumbnail = '';


  constructor(private mediaProvider: MediaProvider) {

  }

  async transform(id: number, ...args) {
    console.log(args);
    // Impure version
    /*
    if (this.cahchedId !== id){
      this.cahchedId = id;
      this.mediaProvider.getSingleMedia(id).subscribe((response: Pic) => {
        switch (args[0]){
          case 'large':
            this.thumbnail = response.thumbnails.w640;
            break;
          case 'medium':
            this.thumbnail = response.thumbnails.w320;
            break;
          case 'screenshot':
            this.thumbnail = response.screenshot;
            break;
          case 'thumbnail':
            this.thumbnail = response.thumbnails.w160;
            break;
        }

    });
  }
  return this.thumbnail;
  */
 // Pure version
  return new Promise((resolve, reject) => {
    this.mediaProvider.getSingleMedia(id).subscribe((response: Pic) => {
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
      default:
      resolve(response.thumbnails.w160);
        }
    });
  });
  }
}
