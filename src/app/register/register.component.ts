import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../_services/session.service';
import { UserService } from '../_services/user.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService,
    private session: SessionService, private router: Router) { }

  @ViewChild('stepper') private myStepper: MatStepper | undefined;

  hide = true;
  submit = false;

  maxDate: Date = new Date();
  minDate: Date = new Date();

  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.maxDate.setFullYear(2010, 11, 31);
    this.minDate.setFullYear(1970, 1, 1);
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]{5,30}$/),
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/),
      ]],
      firstname: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/),
        Validators.minLength(2)
      ]],
      lastname: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/),
        Validators.minLength(2)
      ]],
      dob: ['', [
        Validators.required,
      ]]
    });

  }

  get username() :AbstractControl {
    return this.registerForm.get('username') as AbstractControl;
  }
  get email() :AbstractControl {
    return this.registerForm.get('email') as AbstractControl;
  }
  get password() :AbstractControl {
    return this.registerForm.get('password') as AbstractControl;
  }
  get firstname() :AbstractControl {
    return this.registerForm.get('firstname') as AbstractControl;
  }
  get lastname() :AbstractControl {
    return this.registerForm.get('lastname') as AbstractControl;
  }
  get dob() :AbstractControl {
    return this.registerForm.get('dob') as AbstractControl;
  }

  register() {
    const user = this.registerForm.value;
    this.userService.addUser(user).subscribe(
      res => {
        this.session.login(res._id, res.token);
        this.router.navigateByUrl('');
      },
      err => {
        this.submit = true;
        if (err.error[0] === 'username') {
          this.registerForm.get('username')?.setValue('');
          this.myStepper!.selectedIndex = 0;
        } else if (err.error[0] === 'email') {
          this.registerForm.get('email')?.setValue('');
          this.myStepper!.selectedIndex = 1;
        }
      }
    );
  }
}


