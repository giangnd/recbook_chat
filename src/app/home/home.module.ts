import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRouting } from './home.routing';
import { HomeComponent } from './home.component';
import { LeftComponent } from './left/left.component';
import { RightComponent } from './right/right.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { TopComponent } from './top/top.component';

@NgModule({
  declarations: [HomeComponent, LeftComponent, RightComponent, AuthenticatedComponent, TopComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRouting,
  ]
})
export class HomeModule { }
