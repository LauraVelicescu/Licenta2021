import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../user';
import {LoginService} from '../../services/login/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showThis = true;

  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) {
    console.log('constr')
  }

  loginForm: FormGroup;
  isSubmitted = false;

  ngOnInit() {
    console.log('ngoniit')
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.login(this.loginForm.value);
    this.router.navigateByUrl('/adm');
  }
}
