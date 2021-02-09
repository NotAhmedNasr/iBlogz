import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input('user') user: User = new User();
  constructor(private router: Router, private session: SessionService) { }
  avatar = {};
  loggedUser: User = new User();
  ngOnInit(): void {
    this.session.getLoggedUser().subscribe(
      res => this.loggedUser = res,
      console.log
    )
    this.avatar = {
      backgroundImage: 'url(' + (this.user?.profilePicture || '../../assets/images/profile.png') + ')'
    }
  }

  view() {
    let options = {};
    if (this.loggedUser._id !== this.user._id) {
      options = {queryParams: {id: this.user._id}};
    }
    this.router.navigate(['profile/user'], options);
  }

}
