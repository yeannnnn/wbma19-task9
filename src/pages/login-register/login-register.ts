import { Component, ViewChild } from '@angular/core';
import {
  AlertController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import {
  Login,
  User,
  UserCreated,
  UserExists,
} from '../../interfaces/media';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the LoginRegisterPage page.
 */
@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {

  userAlert = false;

  @ViewChild('lf') loginForm: NgForm;
  @ViewChild('rf') registerForm: NgForm;

  showRegister = false;
  user: User = { username: '' };
  confirmPassword = '';

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider, public alertCtrl: AlertController) {
  }

  swapLoginRegisterForms(): void {
    this.showRegister = !this.showRegister;
  }

  showAlert(message: string): void {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: message,
      buttons: ['OK'],
    });
    alert.present().catch();
  }

  /**
   * Login to WBMA service
   *
   * @param automatic Set true if logging in without filling the login form
   */
  login(automatic = false): void {
    console.log('logging in:', this.user.username);
    this.mediaProvider.login(this.user).subscribe((data: Login) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      this.mediaProvider.token = data.token;
      this.mediaProvider.user = data.user;
      this.mediaProvider.logged = true;
      // Reset form only if it exists
      if (!automatic) this.loginForm.reset();
      this.navCtrl.parent.select(0);
    }, error => {
      console.log(error);
      this.showAlert(error.statusText);
    });
  }

  checkUserExists(): void {
    this.mediaProvider.checkUser(this.user.username).
    subscribe((data: UserExists) => {
      console.log('username free:', data.available);
      if (!data.available) {
        this.registerForm.form.controls['username'].setErrors({ 'incorrect': true });
        this.registerForm.form.controls['username'].markAsTouched();
        this.userAlert = true;
      } else {
        this.userAlert = false;
      }
    });
  }

  /**
   * Change input validation status to ´invalid´ if no match
   */
  checkPasswordMatch(): void {
    if (this.user.password !== this.confirmPassword) {
        this.registerForm.form.controls['confirmPassword'].setErrors({ 'incorrect': true });
        this.registerForm.form.controls['confirmPassword'].markAsTouched();
    }
  }

  register(): void {
    if (this.user.password !== this.confirmPassword) {
      this.showAlert('Passwords do not match!');
      return;
    }
    this.mediaProvider.register(this.user).subscribe((data: UserCreated) => {
      this.login(true);
      this.registerForm.reset();
    }, error => {
      console.log(error);
      this.showAlert(error.error.message);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

}
