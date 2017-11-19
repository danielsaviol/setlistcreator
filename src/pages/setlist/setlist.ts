import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { SetlistProvider } from '../../providers/setlist/setlist';
import { ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import {RegisterSetlistPage} from '../register-setlist/register-setlist';
import {VisualizarSetlistPage} from '../visualizar-setlist/visualizar-setlist';

/**
 * Generated class for the SetlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setlist',
  templateUrl: 'setlist.html',
})
export class SetlistPage {

  setlists: Observable<any>;
  setlist: Array<string>;
  refBD: AngularFireDatabase;



  //refItem: AngularFireObject<any>;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController,
     public navParams: NavParams, database : AngularFireDatabase, public afAuth: AngularFireAuth,
     public setlista: SetlistProvider, public toastCtrl: ToastController,
     public actionSheetCtrl: ActionSheetController) {
     this.refBD = database;
     this.setlists = database.list("setlist/").valueChanges();
  }



  presentActionSheet(nome: string, musicas:string) {
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
          text: 'Editar',
          handler: () => {
            this.infoSetlist(nome, musicas);
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
    console.log('ionViewDidLoad SetlistPage');
  }


  doRefresh(refresher) {
     console.log('Begin async operation', refresher);

     setTimeout(() => {
       console.log('Async operation has ended');
       refresher.complete();
     }, 1000);
   }


  infoSetlist(nome: string, musicas: string ) {
    var refItem = this.refBD.list("setlist/");
    refItem.snapshotChanges([])
      .subscribe( filhos => {
        filhos.forEach( filho => {
          if(filho.payload.val().nome === nome){
            this.setlista.setSetlistKey(filho.key);
            console.log(filho.key);
          }
        });
      });
    //console.log(chave);
    //this.alimento.setAlimentoKey(chave);
    this.setlista.setSetlist(nome, musicas);
    this.navCtrl.push(RegisterSetlistPage);
  }

  deleteAll(){
    //var refBD = this.database.list("listas/" + this.userid);
    var itensRef = this.refBD.list("setlist/");
    itensRef.remove();
  }

  deleteItem(nome: string){
    var refItem = this.refBD.list("setlist/");
    refItem.snapshotChanges([])
      .subscribe( filhos => {
        filhos.forEach( filho => {
          if(filho.payload.val().nome === nome){
            var itensRef = this.refBD.list("setlist/" +  filho.key);
            itensRef.remove();
            this.presentToast('Setlist removida com sucesso')
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
          message: 'Do you want to delete all setlist from the list? ',
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


  showRegisterSetlist(){
    this.navCtrl.push(RegisterSetlistPage);
  }
  showVisualizarSetlist(){
    this.navCtrl.push(VisualizarSetlistPage);
  }

}
