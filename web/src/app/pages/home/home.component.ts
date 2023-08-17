import { Component } from '@angular/core';

import { LoginForm } from 'src/app/shared/forms/login.form';
import { UserService } from 'src/app/shared/services/api/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public loginForm: LoginForm = new LoginForm();

  constructor(private userService: UserService) {}

  public login(): void {
    this.userService.login(this.loginForm);
  }
}
