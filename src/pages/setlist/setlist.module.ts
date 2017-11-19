import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetlistPage } from './setlist';

@NgModule({
  declarations: [
    SetlistPage,
  ],
  imports: [
    IonicPageModule.forChild(SetlistPage),
  ],
})
export class SetlistPageModule {}
