import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDTO} from '../../shared/dto/UserDTO';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(private forgotPasswordService: AuthenticationService, private router: Router, private formBuilder: FormBuilder){
  }
  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
    });
  }


  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      console.log('invalid');
      return;
    } else {
      console.log(this.forgotPasswordForm.controls.emailAddress.value);
      let user: UserDTO = new UserDTO();
      user.emailAddress = this.forgotPasswordForm.controls.emailAddress.value;
      this.forgotPasswordService.forgotPassword(user).subscribe((result) => {
        console.log(result);
      }, error => {
        console.log(error);
      })
    }
  }
}
