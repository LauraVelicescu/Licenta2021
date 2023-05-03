import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDTO} from '../../shared/dto/UserDTO';
import {NotificationService} from '../../shared/services/notification-service/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  response = '';

  constructor(private loginService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, private notifierService: NotificationService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    } else {
      const user: UserDTO = new UserDTO();
      user.emailAddress = this.loginForm.controls.emailAddress.value;
      user.password = this.loginForm.controls.password.value;
      this.loginService.login(user).subscribe((result) => {
        this.router.navigateByUrl('/adm/dashboard').then();
      }, error => {
        this.notifierService.error(error);
      })
    }
  }

  btnClick() {
    this.router.navigateByUrl('/auth/forgotPassword').then();
  }


  registerClick() {
    this.router.navigateByUrl('/auth/register').then();
  }
}
