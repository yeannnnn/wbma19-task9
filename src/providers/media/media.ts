import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pic } from '../../interfaces/pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  configUrl = 'https://media.mw.metropolia.fi/wbma';

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia() {    // paste it from home.ts to provider
    return this.http.get<Pic[]>(this.configUrl + '/media');
  }

  getSingleMedia(id) {
    return this.http.get<Pic>(this.configUrl + '/media/' + id);
  }

}
