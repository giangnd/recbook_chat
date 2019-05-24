import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRouting } from './home.routing';
import { HomeComponent } from './home.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { TopComponent } from './top/top.component';
import { HistoryComponent } from './history/history.component';
import { GroupComponent } from './group/group.component';
import { CreateGroupComponent } from './group/modal/create-group.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, AuthenticatedComponent, TopComponent, HistoryComponent, GroupComponent, CreateGroupComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRouting,
    SharedModule,
  ],
  providers: [],
  entryComponents: [
    CreateGroupComponent,
  ]
})
export class HomeModule { }
