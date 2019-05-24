import { HttpClientModule } from '@angular/common/http';
import { HttpModule, BrowserXhr } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageLoadingComponent } from './message-loading/message-loading.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UnAuthGuardService } from './services/un-auth-guard.service';
import { TokenService } from './services/token.service';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { UserResolver } from './resolves/user.resolver';
import { ValidateMessageComponent } from './validate-message/validate-message.component';
import { SocketService } from './services/socket.services';


@NgModule({
  declarations: [MessageLoadingComponent, ValidateMessageComponent],
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
  ],
  exports: [
    MessageLoadingComponent,
    ValidateMessageComponent,
  ],
  providers: [
    {
      provide: BrowserXhr,
    },
    AuthGuardService,
    UnAuthGuardService,
    TokenService,
    DataService,
    UserService,
    UserResolver,
    SocketService,
  ]
})
export class SharedModule { }
