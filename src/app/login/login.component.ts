import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../_services/session.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router, private session: SessionService) {
      if (localStorage.getItem('userId')) {
        this.router.navigateByUrl('');
      }
    }

  loginForm: FormGroup = new FormGroup({});


  hide = true;
  invalidPassword = false;
  invalid = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
      ]],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    const user = this.loginForm.value;
    this.userService.login(user).subscribe(
      res => {
        this.session.login(res._id, res.token);
        location.reload();
      },
      err => {
        if (err.error === 'Unauthenticated') {
          this.invalid = true;
          this.loginForm.get('username')?.setValue('');
          this.loginForm.get('password')?.setValue('');
        }
      }
    );
  }

}
