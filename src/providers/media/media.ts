import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginResponse,
  Media,
  // RegisteredResponse,
  User,
} from '../../interfaces/media';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  mediaAPI = 'https://media.mw.metropolia.fi/wbma'; // configUrl
  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';
  // mediaArray: Media[];
  logged = false;
  user: User = null;
  token;
 // username: string;
 // user_id: number;
 // fullname: string;
 // avatar;
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

  getFilesByTag(tag) {
    // singe file
    return this.http.get<Media[]>(this.mediaAPI + 'tags/' + tag);
  }


  checkToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.get<User>(this.mediaAPI + 'users/user', httpOptions);
  }

  upload(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.post<LoginResponse>(this.mediaAPI + 'media', data, httpOptions);
  }
}
