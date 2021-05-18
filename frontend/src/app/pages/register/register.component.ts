import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {UserDTO} from '../../shared/dto/UserDTO';
import {NotificationService} from '../../shared/services/notification-service/notification.service';
import {Router} from '@angular/router';
import {ApplicationRoutes} from '../../shared/util/ApplicationRoutes';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private registerService: AuthenticationService, private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      cpassword: ['',
        [
          Validators.required,
          this.matchValues('password'),
        ],
      ],
    });
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      return;
    } else {
      let user: UserDTO = new UserDTO();
      user.firstName = this.registerForm.controls.firstName.value;
      user.lastName = this.registerForm.controls.lastName.value;
      user.emailAddress = this.registerForm.controls.emailAddress.value;
      user.password = this.registerForm.controls.password.value;
      this.registerService.register(user).subscribe((result) => {
        this.notificationService.success('Cont creat cu succes!');
        this.router.navigate([ApplicationRoutes.AUTH_MODULE_ROUTE + '/' + ApplicationRoutes.LOGIN_ROUTE]).then();
      }, error => {
        this.notificationService.error(error);
      })
    }
  }

  public matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null
        : {passwordMatch: true};
    };
  }

}

