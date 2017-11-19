import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SetlistPage} from '../setlist/setlist';
import {MusicPage} from '../music/music';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  showSetlist(){
    this.navCtrl.push(SetlistPage);
  }

  showMusica(){
    this.navCtrl.push(MusicPage);
  }

}
