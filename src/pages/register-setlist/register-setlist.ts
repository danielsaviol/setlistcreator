import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { SetlistPage } from '../setlist/setlist';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';
import { ActionSheetController } from 'ionic-angular';
import {RegisterMusicPage} from '../register-music/register-music';


/**
 * Generated class for the RegisterSetlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-setlist',
  templateUrl: 'register-setlist.html',
})
export class RegisterSetlistPage {

  musics: Observable<any>;
  music: Array<string>;
  refBD: AngularFireDatabase;

  private setlistForm: FormGroup;

  constructor(public navCtrl: NavController, private database: AngularFireDatabase,
    public fb: FormBuilder, public afAuth: AngularFireAuth, public alertCtrl: AlertController,
    public navParams: NavParams, database2: AngularFireDatabase,
    public musica: MusicProvider, public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController
    ) {
      this.refBD = database2;
      this.musics = database2.list("music/").valueChanges();  
      this.setlistForm = fb.group({
      'nome': ['', [Validators.required]],
      'musicas': [''],
      });
    }

ionViewDidLoad() {
console.log('ionViewDidLoad RegisterSetlistPage');
}

doRefresh(refresher) {
  console.log('Begin async operation', refresher);

  setTimeout(() => {
    console.log('Async operation has ended');
    refresher.complete();
  }, 1000);
}


infoMusic(nome: string, artista: string, letra: string, cifra: string ) {
 var refItem = this.refBD.list("music/");
 refItem.snapshotChanges([])
   .subscribe( filhos => {
     filhos.forEach( filho => {
       if(filho.payload.val().nome === nome){
         this.musica.setMusicKey(filho.key);
         console.log(filho.key);
       }
     });
   });
 //console.log(chave);
 //this.alimento.setAlimentoKey(chave);
 this.musica.setMusic(nome, artista, letra, cifra);
 this.navCtrl.push(RegisterMusicPage);
}

deleteItem(nome: string){
 var refItem = this.refBD.list("setlist/");
 refItem.snapshotChanges([])
   .subscribe( filhos => {
     filhos.forEach( filho => {
       if(filho.payload.val().nome === nome){
         var itensRef = this.refBD.list("setlist/" +  filho.key);
         itensRef.remove();
         console.log(filho.key);
       }
     });
   });
}



form_submit() {

console.log(this.setlistForm.value.nome);




this.database.list("setlist/").push({
 nome: this.setlistForm.value.nome,
 musicas: this.setlistForm.value.musicas,
 

 }).then((t: any) => console.log('dados gravados: '+ t.key)), (e: any) => console.log(e.message);


 this.setlistForm.reset();
 this.navCtrl.push(SetlistPage)
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
