import { Pipe, PipeTransform } from '@angular/core';
import { Pic } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the UserTagPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'userTag',
})
export class UserTagPipe implements PipeTransform {
  constructor(public mediaProvider: MediaProvider) {

  }

  async transform(tag: string) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getAvatar(tag).subscribe((files: Pic[]) => {
        files.forEach((file: Pic) => {
          if (file.user_id === this.mediaProvider.user.user_id) {
            resolve(file.file_id);
          } else {
            reject('No avatar found.');
          }
        });
      });
    });
  }
}
