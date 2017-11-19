import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { SetlistProvider } from '../../providers/setlist/setlist';
import { ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the VisualizarSetlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visualizar-setlist',
  templateUrl: 'visualizar-setlist.html',
})
export class VisualizarSetlistPage {

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



  presentActionSheet(key: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: key,
      buttons: [
        {
          text: 'Apagar',
          role: 'destructive',
          handler: () => {
            this.deleteItem(key);
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


  infoSetlist(key: string ) {
    var refItem = this.refBD.list("setlist/");
    refItem.snapshotChanges([])
      .subscribe( filhos => {
        filhos.forEach( filho => {
          if(filho.payload.val().key === key){
            this.setlista.setSetlistKey(key);
            console.log(key);
          }
        });
      });
    //console.log(chave);
    //this.alimento.setAlimentoKey(chave);
    this.setlista.setSetlistKey(key);
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
  }

  presentToast( msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }


}

