import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMusicPage } from './edit-music';

@NgModule({
  declarations: [
    EditMusicPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMusicPage),
  ],
})
export class EditMusicPageModule {}
