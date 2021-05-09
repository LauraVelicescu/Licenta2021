import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NGOService} from '../../services/ngo.service';
import {NGODTO} from '../../components/dto/NGODTO';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-ngo',
  templateUrl: './ngo.component.html',
  styleUrls: ['./ngo.component.scss']
})
export class NGOComponent implements OnInit {

  NGOForm: FormGroup;
  selectedFile: File;
  currentNGO: NGODTO
  retrievedImage: any;
  base64Data: any;
  message: string;
  imageName: any;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private formBuilder: FormBuilder, private NGOService: NGOService) {}

  ngOnInit(): void {
    this.NGOForm = this.formBuilder.group({
        name:[''],
        acronym: [''],
        foundingDate:[''],
        facebookLink: [''],
        twitterLink: [''],
        linkedinLink: [''],
        description: ['']
      }
    )
    this.NGOService.getNGO().subscribe((result : NGODTO) => {
      this.currentNGO = result;
      this.base64Data = this.currentNGO.logo;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      this.NGOForm.patchValue({
          name: this.currentNGO.name,
          acronym: this.currentNGO.acronym,
          foundingDate: formatDate(this.currentNGO.foundingDate, 'yyyy-MM-dd', 'en-US'),
          facebookLink: this.currentNGO.facebookLink,
          twitterLink: this.currentNGO.twitterLink,
          linkedinLink: this.currentNGO.linkedinLink,
          description: this.currentNGO.description,
        }
      )
    })
  }

  onSubmit()
  {
    if (this.NGOForm.invalid) {
      return;
    } else {
      const ngo: NGODTO = new NGODTO();
      ngo.name = this.NGOForm.controls.name.value;
      ngo.foundingDate = this.NGOForm.controls.foundingDate.value;
      ngo.acronym = this.NGOForm.controls.acronym.value;
      ngo.facebookLink = this.NGOForm.controls.facebookLink.value;
      ngo.twitterLink = this.NGOForm.controls.twitterLink.value;
      ngo.linkedinLink = this.NGOForm.controls.linkedinLink.value;
      ngo.description = this.NGOForm.controls.description.value;
      this.NGOService.update(ngo).subscribe((result ) => {
        console.log(result);
      }, error => {
        console.log(error);
      })
    }
  }

  goToSite(url: string) {
    window.open(url, '_blank');
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.type);

    const uploadImageData = new FormData();
    if (this.selectedFile.type.includes('image')) {
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.NGOService.updateLogo(uploadImageData).subscribe((result) => {
        this.base64Data = result.logo;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
    }
  }
}
