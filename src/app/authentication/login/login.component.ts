import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../shared/services/user.service';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { RegexHelper } from '../../shared/helpers/regex.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  submitted: boolean = false;
  regexHelper = RegexHelper;
  passwordLength: number = 6;

  constructor(
    @Input()
    private router: Router,
    private messageService: NgFlashMessageService,
    private storageService: StorageService,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (!this.canSubmit()) {
      return;
    }
    this.userService.login(this.user, this.callback.bind(this));
  }

  canSubmit() {
    return this.user.email && this.user.password;
  }

  callback(errMsg, response) {
    if (errMsg) {
      return this.messageService.showFlashMessage({ messages: [errMsg], type: 'warning' });
    }
    const returnUrl = this.storageService.get('return-url');
    if (returnUrl) {
      this.storageService.remove('return-url');
      return this.router.navigateByUrl(returnUrl);
    }
    this.router.navigate(['/']);
  }

}
