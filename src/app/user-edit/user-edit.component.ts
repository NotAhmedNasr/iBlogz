import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../_models/user';
import { SessionService } from '../_services/session.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { user: User },
    public dialogRef: MatDialogRef<UserEditComponent>, private userService: UserService,
    private session: SessionService
  ) { }

  hide = true;
  newPassword = false;
  maxDate: Date = new Date();
  minDate: Date = new Date();

  toEditUser: User = new User();

  editForm: FormGroup = new FormGroup({});


  ngOnInit(): void {
    this.maxDate.setFullYear(2010, 11, 31);
    this.minDate.setFullYear(1970, 1, 1);

    this.toEditUser = this.data.user;

    this.editForm = this.fb.group({
      username: [this.toEditUser.username, [
        Validators.required,
        Validators.pattern(/^[A-Za-z]{8,14}$/),
      ]],
      email: [this.toEditUser.email, [
        Validators.required,
        Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
      ]],
      firstname: [this.toEditUser.firstname, [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/)
      ]],
      lastname: [this.toEditUser.lastname, [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/)
      ]],
      dob: [this.toEditUser.dob, [
        Validators.required,
      ]]
    });

  }

  get username(): AbstractControl {
    return this.editForm.get('username') as AbstractControl;
  }
  get email(): AbstractControl {
    return this.editForm.get('email') as AbstractControl;
  }
  get password(): AbstractControl {
    return this.editForm.get('password') as AbstractControl;
  }
  get firstname(): AbstractControl {
    return this.editForm.get('firstname') as AbstractControl;
  }
  get lastname(): AbstractControl {
    return this.editForm.get('lastname') as AbstractControl;
  }
  get dob(): AbstractControl {
    return this.editForm.get('dob') as AbstractControl;
  }

  addPassword() {
    this.editForm.addControl('password', this.fb.control('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/),
    ]))
    this.newPassword = true;
  }

  removePassword() {
    this.newPassword = false;
    this.editForm.removeControl('password');
  }

  close() {
    this.dialogRef.close();
  }

  edit() {
    this.userService.edit(this.editForm.value).subscribe(
      res => {
        this.session.loadUser();
        this.dialogRef.close();
      },
      console.log
    );
  }
}
