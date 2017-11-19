import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterSetlistPage } from './register-setlist';

@NgModule({
  declarations: [
    RegisterSetlistPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterSetlistPage),
  ],
})
export class RegisterSetlistPageModule {}
