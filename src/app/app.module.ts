import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';


import {SetlistPage} from '../pages/setlist/setlist';
import {MusicPage} from '../pages/music/music';
import {RegisterMusicPage} from '../pages/register-music/register-music';
import {EditMusicPage} from '../pages/edit-music/edit-music';
import {RegisterSetlistPage} from '../pages/register-setlist/register-setlist';
import {VisualizarSetlistPage} from '../pages/visualizar-setlist/visualizar-setlist';
import { MusicProvider } from '../providers/music/music';
import { SetlistProvider } from '../providers/setlist/setlist';



var config = {
  apiKey: "AIzaSyB6bJ3Tu4dKKXajuktUXdgbFcxizg6SYCA",
  authDomain: "setlist-creator.firebaseapp.com",
  databaseURL: "https://setlist-creator.firebaseio.com",
  projectId: "setlist-creator",
  storageBucket: "",
  messagingSenderId: "401381390701"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SetlistPage,
    MusicPage,
    RegisterMusicPage,
    RegisterSetlistPage,
    VisualizarSetlistPage,
    EditMusicPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SetlistPage,
    MusicPage,
    RegisterMusicPage,
    RegisterSetlistPage,
    VisualizarSetlistPage,
    EditMusicPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MusicProvider,
    SetlistProvider
  ]
})
export class AppModule {}
