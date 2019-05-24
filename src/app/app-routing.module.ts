import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategy } from './core/strategies/preload.strategy';
import { AuthenticatedComponent } from './home/authenticated/authenticated.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { UnAuthGuardService } from './shared/services/un-auth-guard.service';
import { UserResolver } from './shared/resolves/user.resolver';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        loadChildren: () => HomeModule,
      },
      {
        path: 'user',
        loadChildren: () => UserModule,
      }
    ],
    resolve: {
      UserResolver,
    },
    data: {
      preload: true,
    }
  },
  {
    path: 'auth',
    loadChildren: () => AuthenticationModule,
    canActivate: [UnAuthGuardService],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy]
})
export class AppRoutingModule { }
