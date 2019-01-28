import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginResponse,
  Media,
  // RegisteredResponse,
  User,
} from '../../interfaces/pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  mediaAPI = 'https://media.mw.metropolia.fi/wbma'; // configUrl
  mediaArray: Media[];
  logged = false;

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia() {    // paste it from home.ts to provider
    return this.http.get<Media[]>(this.mediaAPI + '/media');
  }

  getSingleMedia(id) {
    return this.http.get<Media>(this.mediaAPI + '/media/' + id);
  }

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.post<LoginResponse>(this.mediaAPI + '/login', user, httpOptions);
  }

  register(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.post<LoginResponse>(this.mediaAPI + '/users', user, httpOptions);
  }

  /*
    login(user: User) {
      return this.http.post<LoginResponse>(this.mediaAPI + '/login', user);
    }

    register(user: User) {
      return this.http.post<RegisteredResponse>(this.mediaAPI + '/users', user);
    }
  */
  checkIfUserExist(user: User) {
    return this.http.get(this.mediaAPI + '/users/username/' + user.username);
  }
}
