import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationRouting } from './authentication.routing';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthenticationComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRouting,
    SharedModule,
  ]
})
export class AuthenticationModule { }
