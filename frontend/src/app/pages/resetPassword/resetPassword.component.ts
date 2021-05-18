import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../shared/services/authentication/authentication.service";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {PasswordDTO} from "../../shared/dto/PasswordDTO";
import {NotificationService} from '../../shared/services/notification-service/notification.service';
import {ApplicationRoutes} from '../../shared/util/ApplicationRoutes';

@Component({
  selector: "app-login",
  templateUrl: "./resetPassword.component.html",
  styleUrls: ["./resetPassword.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  invalidToken = false;

  constructor(private resetPasswordService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
      cpassword: ["",
        [
          Validators.required,
          this.matchValues("password"),
        ],
      ],
    });
    this.activatedRoute.queryParamMap.subscribe((result) => {
      this.resetPasswordService.validateToken(result.get("token")).subscribe((result2) => {
      }, error => {
        this.invalidToken = true;
        this.notificationService.error(error);
      })
    })
  }


  async onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    } else {
      const password: PasswordDTO = new PasswordDTO();
      password.newPassword = this.resetPasswordForm.controls.password.value;
      await this.activatedRoute.queryParamMap.subscribe((result) => {
        password.token = result.get("token");
      });
      this.resetPasswordService.resetPassword(password).subscribe((result) => {
        this.notificationService.success("Parola resetata cu succes");
        this.router.navigateByUrl(ApplicationRoutes.AUTH_MODULE_ROUTE + "/" + ApplicationRoutes.LOGIN_ROUTE);
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
        : { passwordMatch: true };
    };
  }

}


