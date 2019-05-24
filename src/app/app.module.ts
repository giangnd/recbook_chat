import { MessageFlashService } from 'src/app/shared/services/message-flash.service';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthenticationModule,
    UserModule,
    HomeModule,
    NgFlashMessagesModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [BsModalRef, MessageFlashService],
  bootstrap: [AppComponent]
})
export class AppModule { }
