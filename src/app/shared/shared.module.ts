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
import { GroupService } from './services/group.service';
import { MessageFlashComponent } from './message-flash/message-flash.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { LoadingXhrProvider } from './providers/loading-xhr.provider';

@NgModule({
  declarations: [MessageLoadingComponent, ValidateMessageComponent, MessageFlashComponent, PageLoadingComponent],
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
  ],
  exports: [
    MessageLoadingComponent,
    ValidateMessageComponent,
    MessageFlashComponent,
    PageLoadingComponent,
  ],
  providers: [
    {
      provide: BrowserXhr, useClass: LoadingXhrProvider,
    },
    AuthGuardService,
    UnAuthGuardService,
    TokenService,
    DataService,
    UserService,
    UserResolver,
    SocketService,
    GroupService,
  ]
})
export class SharedModule { }
