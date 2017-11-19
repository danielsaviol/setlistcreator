import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { MusicProvider } from '../../providers/music/music';
import { ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { RegisterMusicPage } from '../register-music/register-music';
import { EditMusicPage } from '../edit-music/edit-music';



/**
 * Generated class for the MusicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-music',
  templateUrl: 'music.html',
})
export class MusicPage {

  musics: Observable<any>;
  music: Array<string>;
  refBD: AngularFireDatabase;



  //refItem: AngularFireObject<any>;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController,
     public navParams: NavParams, database : AngularFireDatabase, public afAuth: AngularFireAuth,
     public musica: MusicProvider, public toastCtrl: ToastController,
     public actionSheetCtrl: ActionSheetController) {
     this.refBD = database;
     this.musics = database.list("music/").valueChanges();
  }



  presentActionSheet(nome: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: nome,
      buttons: [
        {
          text: 'Apagar',
          role: 'destructive',
          handler: () => {
            this.deleteItem(nome);
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MusicPage');
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
    this.musica.setMusic(nome, artista, letra, cifra);
    this.navCtrl.push(EditMusicPage);
  }

  deleteAll(){
    //var refBD = this.database.list("listas/" + this.userid);
    var itensRef = this.refBD.list("music/");
    itensRef.remove();
  }

  deleteItem(nome: string){
    var refItem = this.refBD.list("music/");
    refItem.snapshotChanges([])
      .subscribe( filhos => {
        filhos.forEach( filho => {
          if(filho.payload.val().nome === nome){
            var itensRef = this.refBD.list("music/" +  filho.key);
            itensRef.remove();
            this.presentToast('Música removida com sucesso')
            console.log(filho.key);
          }
        });
      });
    //console.log(chave);
    //this.alimento.setAlimentoKey(chave);
    //this.alimento.setAlimento(nome, peso, preco, quantidade);

    //this.presentToast('Item removido com sucesso');
  }

  presentToast( msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  showConfirm() {
      let confirm = this.alertCtrl.create({
        title: 'Delete All',
          message: 'Do you want to delete all music from the list? ',
            buttons: [
              {
                text: 'Disagree',
                handler: () => {
                  console.log('Disagree clicked');
                }
              },
              {
                text: 'Agree',
                handler: () => {
                  this.deleteAll();
                  console.log('Agree clicked');
                }
              }
            ]
          });
          confirm.present();
    }


  showRegisterMusic(){
    this.navCtrl.push(RegisterMusicPage);
  }

}
