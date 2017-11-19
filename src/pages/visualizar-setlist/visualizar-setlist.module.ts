import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisualizarSetlistPage } from './visualizar-setlist';

@NgModule({
  declarations: [
    VisualizarSetlistPage,
  ],
  imports: [
    IonicPageModule.forChild(VisualizarSetlistPage),
  ],
})
export class VisualizarSetlistPageModule {}
