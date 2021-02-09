import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-delete',
  template: `
    <div class="text-center">
      <h1 class="text-danger">Are you sure?</h1>
      <button mat-button color="primary" (click)="cancel()">
        Cancel
      </button>
      <button mat-button color="warn" (click)="confirm()">
        yes
      </button>
    </div>
  `,
  styles: [
  ]
})

export class ConfirmDelete {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDelete>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  confirm(): void {
    this.dialogRef.close(true);
  }
  cancel(): void {
    this.dialogRef.close(false);
  }
}
