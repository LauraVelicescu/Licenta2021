import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../user';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDTO} from '../../components/dto/UserDTO';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  response = 'nimic inca';
  constructor(private loginService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('invalid');
      return;
    } else {
      console.log(this.loginForm.controls.emailAddress.value);
      let user: UserDTO = new UserDTO();
      user.emailAddress = this.loginForm.controls.emailAddress.value;
      user.password = this.loginForm.controls.password.value;
      this.loginService.login(user).subscribe((result) => {
        console.log(result);
        this.router.navigateByUrl('/adm/dashboard')
      }, error => {
        console.log(error);
      })
    }
  }

  btnClick = function (){
    this.router.navigateByUrl('/auth/forgotPassword');
  }
}
