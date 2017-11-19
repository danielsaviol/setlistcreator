import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {  NgForm } from '@angular/forms';
import {MusicPage} from '../music/music';


/**
 * Generated class for the EditMusicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-music',
  templateUrl: 'edit-music.html',
})
export class EditMusicPage {

  public infoMusic = {
    nome: "",
    artista: "",
    letra: "",
    cifra: "",
}


refBD: AngularFireDatabase;



constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public music: MusicProvider, database : AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.infoMusic = this.music.getMusic();
    console.log(this.music.getMusicKey())
    this.refBD = database;
    /*this.afAuth.authState.subscribe( user => {
          this.userid = user.uid;
    })*/
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMusicPage');
  }

  form_edit(f: NgForm) {
    if (!f.valid) {
      return;
    } console.log(f.controls.nome.value, f.controls.artista.value, f.controls.letra.value, f.controls.cifra.value)
    this.editItem(f.controls.nome.value, f.controls.artista.value, f.controls.letra.value, f.controls.cifra.value);
  }



editItem(nome: string, artista: string, letra: string, cifra: string ){
   console.log(this.music.getMusicKey())
  
    var itensRef;
    itensRef = this.refBD.object("music/"  +  this.music.getMusicKey());
    itensRef.update({ nome : nome});
    itensRef.update({ artista : artista});
    itensRef.update({ letra : letra});
    itensRef.update({ cifra : cifra});
    this.music.setMusic(nome, artista, letra, cifra);
    this.navCtrl.push(MusicPage);

}

}
