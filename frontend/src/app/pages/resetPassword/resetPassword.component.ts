import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../user';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {UserDTO} from '../../components/dto/UserDTO';
import {PasswordDTO} from "../../components/dto/PasswordDTO";

@Component({
  selector: 'app-login',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  invalidToken: boolean = false;

  constructor(private resetPasswordService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      cpassword: ['',
        [
          Validators.required,
          this.matchValues('password'),
        ],
      ],
    });
    console.log(this.activatedRoute);
    console.log(this.activatedRoute.queryParams);
    this.activatedRoute.queryParamMap.subscribe((result) => {
      this.resetPasswordService.validateToken(result.get('token')).subscribe((result2) => {
        console.log(result2);
      }, error => {
        this.invalidToken = true;
        console.log(error);
      })
    })
  }


  async onSubmit() {
    if (this.resetPasswordForm.invalid) {
      console.log('invalid');
      return;
    } else {
      let password: PasswordDTO = new PasswordDTO();
      password.newPassword = this.resetPasswordForm.controls.password.value;
      await this.activatedRoute.queryParamMap.subscribe((result) => {
        password.token = result.get('token');
      });
      this.resetPasswordService.resetPassword(password).subscribe((result) => {
        console.log(result);
      }, error => {
        console.log(error);
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
        : { passwordMatch: true };
    };
  }

  btnClick = function (){
    this.router.navigateByUrl('/auth/login');
  }
}


