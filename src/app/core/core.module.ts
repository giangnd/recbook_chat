import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';
import { SelectivePreloadingStrategy } from './strategies/preload.strategy';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    StorageService,
    SelectivePreloadingStrategy,
  ]
})
export class CoreModule { }
