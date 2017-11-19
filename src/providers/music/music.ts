import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the MusicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MusicProvider {

  constructor() {
    console.log('Hello MusicProvider Provider');
  }

  private music = {
    nome: "",
    artista: "",
    letra: "",
    cifra: "",

}

private musicKey: string;

getMusicKey(){
  return this.musicKey;
}
setMusicKey( key: string){
  this.musicKey = key;
}

getMusic(){
  return this.music;
}

setMusic(nome: string, artista: string, letra: string, cifra: string ){
    this.music.nome = nome;
    this.music.artista = artista;
    this.music.letra = letra;
    this.music.cifra = cifra;
  }


}
