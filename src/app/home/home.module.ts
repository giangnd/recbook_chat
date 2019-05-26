import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRouting } from './home.routing';
import { HomeComponent } from './home.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { TopComponent } from './top/top.component';
import { GroupComponent } from './group/group.component';
import { CreateGroupComponent } from './group/modal/create-group.component';
import { AddMemberComponent } from './group/modal/add-member.component';
import { SharedModule } from '../shared/shared.module';
import { MemberComponent } from './member/member.component';
import { MessageComponent } from './message/message.component';
import { ConfirmationModalComponent } from './group/modal/confirm.component';

@NgModule({
  declarations: [
    HomeComponent,
    AuthenticatedComponent,
    TopComponent,
    GroupComponent,
    CreateGroupComponent,
    MemberComponent,
    AddMemberComponent,
    MessageComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRouting,
    SharedModule,
  ],
  providers: [],
  entryComponents: [
    CreateGroupComponent,
    AddMemberComponent,
    ConfirmationModalComponent,
  ]
})
export class HomeModule { }
