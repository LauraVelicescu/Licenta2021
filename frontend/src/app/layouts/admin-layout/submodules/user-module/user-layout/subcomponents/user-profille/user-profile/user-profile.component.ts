import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserDTO} from '../../../../../../../../shared/dto/UserDTO';
import {UserService} from '../../../../../../../../shared/services/user-service/user.service';
import {formatDate} from '@angular/common';
import {ApplicationService} from '../../../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../../../shared/services/notification-service/notification.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  currentUser: UserDTO;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  message: string;
  imageName: any;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private applicationService: ApplicationService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
        emailAddress: [''],
        firstName: [''],
        lastName: [''],
        birthday: [''],
        facebookLink: [''],
        twitterLink: [''],
        linkedinLink: [''],
        aboutMe: ['']
      }
    )
    this.userService.getUser().subscribe((result: UserDTO) => {
      this.currentUser = result;
      this.base64Data = this.currentUser.profilePicture;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      this.userForm.patchValue({
          emailAddress: this.currentUser.emailAddress,
          firstName: this.currentUser.firstName,
          lastName: this.currentUser.lastName,
          birthday: formatDate(this.currentUser.birthday, 'yyyy-MM-dd', 'en-US'),
          facebookLink: this.currentUser.facebookLink,
          twitterLink: this.currentUser.twitterLink,
          linkedinLink: this.currentUser.linkedinLink,
          aboutMe: this.currentUser.aboutMe,
        }
      )
    })
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    } else {
      const user: UserDTO = this.currentUser;
      user.emailAddress = this.userForm.controls.emailAddress.value;
      user.firstName = this.userForm.controls.firstName.value;
      user.lastName = this.userForm.controls.lastName.value;
      user.birthday = this.userForm.controls.birthday.value;
      user.facebookLink = this.userForm.controls.facebookLink.value;
      user.twitterLink = this.userForm.controls.twitterLink.value;
      user.linkedinLink = this.userForm.controls.linkedinLink.value;
      user.aboutMe = this.userForm.controls.aboutMe.value;

      this.applicationService.emmitLoading(true);
      this.userService.update(user).subscribe((result) => {
        this.applicationService.emmitLoading(false);
      }, error => {
        this.applicationService.emmitLoading(false);
        this.notificationService.error(error);
      })
    }
  }

  goToSite(url: string) {
    window.open(url, '_blank');
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    const uploadImageData = new FormData();
    if (this.selectedFile.type.includes('image')) {
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.userService.updateProfilePicture(uploadImageData).subscribe((result) => {
        this.base64Data = result.profilePicture;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
    }
  }
}
