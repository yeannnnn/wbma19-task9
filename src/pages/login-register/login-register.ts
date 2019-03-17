import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { User, logInResponse, registerResponse, checkResponse } from '../../interfaces/user';
import { HomePage } from '../home/home';

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

  user: User = { username: "", full_name: "" };

  showRegister = false;
  confirmUser="";
  confirmPassword: string;
  fullName: boolean;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public alertCtrl: AlertController) {
  }

  swapButton() {
    this.showRegister = !this.showRegister;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
    this.checkLogin();
  }

  checkLogin(){
    if(localStorage.getItem('token')){
      this.navCtrl.push(HomePage);
      this.mediaProvider.loggedIn = true;
    }
  }

  submitReg(){
    this.checkEmail();
    this.checkFullname();
    if(this.user.username =="" || this.user.password ==""){
      const alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Missing password or username.',
        buttons: ['Dismiss']
      });
      alert.present();
    }else{
      this.checkPassword();
    }
  }

  checkPassword(){
    if(this.user.password.length <= 8){
      const alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Password must be atleast 8 characters long.',
        buttons: ['Dismiss']
      });
      alert.present();
    }else{
    if(this.user.password === this.confirmPassword){
      this.register();
    }else{
      const alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Passwords do not match.',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }
  }

  checkUser(){
    this.mediaProvider.check(this.user).subscribe(
      (response: checkResponse) => {
        console.log(response);
        if(this.user.username.length >= 3) {
          if(!response.available){
            const alert = this.alertCtrl.create({
              title: 'Warning',
              subTitle: 'Username already taken.',
              buttons: ['Dismiss']
            });
            alert.present();
            this.user.username="";
          }
        } else {
          const alert = this.alertCtrl.create({
            title: 'Warning',
            subTitle: 'Username must be atleast 3 characters long.',
            buttons: ['Dismiss']
          });
          alert.present();
          this.user.username="";
        }
      },
      error => {
        console.log(error);
      });
  }

  checkEmail(){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
    if(!this.user.email.match(mailformat)) {  
      const alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'You have entered an invalid email address.',
        buttons: ['Dismiss']
      });
      alert.present();
      this.user.email="";
    }
  }
  
  checkFullname(){
    var nameformat = /^[a-zA-Z ]+$/;
    if(!this.user.full_name.match(nameformat) && this.user.full_name != "") {
      const alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Your full name contains non alphabetic characters.',
        buttons: ['Dismiss']
      });
      alert.present();
      this.user.full_name="";
    }
  }


  login() {
    this.mediaProvider.login(this.user).subscribe(
      (response: logInResponse) => {
        console.log(response);
        this.navCtrl.push(HomePage);
        localStorage.setItem('token', response.token)
        this.mediaProvider.loggedIn = true;
        this.resetForm();
      },
      error => {
        console.log(error);
      });
  }

  register() {
    this.mediaProvider.register(this.user).subscribe(
      (response: registerResponse) => {
        console.log(response);
        this.mediaProvider.loggedIn = true;
        this.login();
      },
      error => {
        console.log(error);
      });
  }

  resetForm() {
    this.user.username="";
    this.user.password="";
    this.user.full_name="";
    this.confirmPassword="";
    this.user.email="";
  }
}
