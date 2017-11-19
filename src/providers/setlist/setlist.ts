import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the SetlistProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SetlistProvider {

  constructor() {
    console.log('Hello SetlistProvider Provider');
  }

  private setlist = {
    nome: "",
    musicas: "",

}

private setlistKey: string;

getSetlistKey(){
  return this.setlistKey;
}
setSetlistKey( key: string){
  this.setlistKey = key;
}

getSetlist(){
  return this.setlist;
}

setSetlist(nome: string, musicas: string){
    this.setlist.nome = nome;
    this.setlist.musicas = musicas;
  }


}
