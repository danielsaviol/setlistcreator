import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterMusicPage } from './register-music';

@NgModule({
  declarations: [
    RegisterMusicPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterMusicPage),
  ],
})
export class RegisterMusicPageModule {}
