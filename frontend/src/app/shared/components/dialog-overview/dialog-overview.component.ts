import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.scss']
})
export class DialogOverviewComponent {

  @Inject(MAT_DIALOG_DATA) data: string;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
