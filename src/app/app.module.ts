import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MediaProvider } from '../providers/media/media';
import { PipesModule } from '../pipes/pipes.module';
import { MenuPage } from '../pages/menu/menu';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { LogoutPage } from '../pages/profile/profile';
import { UploadPage } from '../pages/upload/upload';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    LoginRegisterPage,
    LogoutPage,
    UploadPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    LoginRegisterPage,
    LogoutPage,
    UploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PhotoViewer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider,
  ],
})
export class AppModule {
}
