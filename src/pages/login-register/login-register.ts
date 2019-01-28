import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckUserName, LoginResponse, User } from '../../interfaces/pic';
import { HomePage } from '../home/home';
import { MediaProvider } from '../../providers/media/media';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {
  user: User = { username: null };

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider, public http: HttpClient) {
  }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      this.navCtrl.push(HomePage);
    }
  }

  loginForm() {
    this.mediaProvider.login(this.user).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.navCtrl.push(HomePage);
        this.mediaProvider.logged = true;
      },
      error => {
        console.log(error);
      },
    );
  }

  registerForm() {
    this.mediaProvider.checkIfUserExist(this.user).subscribe((response: CheckUserName) => {
        console.log(response);
        this.mediaProvider.register(this.user).subscribe(
          (response: LoginResponse) => {
            localStorage.setItem('token', response.token);
            this.navCtrl.push(HomePage);
            console.log(response);
          },
          error => {
            console.log(error);
          },
        );
      },
      error => {
        console.log(error);
      },
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

}
