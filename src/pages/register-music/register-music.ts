import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {MusicPage} from '../music/music';

/**
 * Generated class for the RegisterMusicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-music',
  templateUrl: 'register-music.html',
})
export class RegisterMusicPage {

  private musicForm: FormGroup;
  
   constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase,
               public fb: FormBuilder, public toastCtrl: ToastController, public afAuth: AngularFireAuth
               ) {
  
     this.musicForm = fb.group({
       'nome': ['', [Validators.required]],
       'artista': ['', [Validators.required]],
       'letra': ['', [Validators.required]],
       'cifra': ['', [Validators.required]],
     });
   }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad RegisterMusicPage');
    }

    
  
  
    form_submit() {
  
      console.log(this.musicForm.value.nome);
      //if (data && data.email && data.uid) {
        //  this.produtos = database.list("listas/" + data.uid).valueChanges();
      //}
        this.database.list("music/").push({
            nome: this.musicForm.value.nome,
            artista: this.musicForm.value.artista,
            letra: this.musicForm.value.letra,
            cifra: this.musicForm.value.cifra,
            }).then((t: any) => console.log('dados gravados: '+ t.key)), (e: any) => console.log(e.message);
            this.musicForm.reset();
            this.navCtrl.push(MusicPage)
            this.presentToast();
  
    }
  
    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Música cadastrada com sucesso! ',
        duration: 1000
      });
      toast.present();
    }

}
