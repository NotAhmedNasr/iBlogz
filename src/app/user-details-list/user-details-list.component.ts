import { Component, OnInit } from '@angular/core';
import { fade } from '../_animations/fade';
import { User } from '../_models/user';
import { SessionService } from '../_services/session.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-details-list',
  templateUrl: './user-details-list.component.html',
  styleUrls: ['./user-details-list.component.css'],
  animations: [
    fade('fade', 500)
  ]
})
export class UserDetailsListComponent implements OnInit {
  users: User[] = [];
  currentUser: User = new User();

  page = 0;
  count = 2;

  endOfLoading = false;
  showSpinner = false;
  loaded = false;

  all = true;
  followers = false;
  following = false;

  constructor(private userService: UserService, private session: SessionService) { }

  ngOnInit(): void {
    this.getAll();
    this.session.getLoggedUser().subscribe(
      res => this.currentUser = res,
      console.log
    );
  }

  getAll() {
    this.showSpinner = true;
    this.page = 0;
    this.all = true;
    this.endOfLoading = false;
    this.following = this.followers = false;
    this.users = [];
    this.load(this.page, this.count);
  }

  getFollowing() {
    this.showSpinner = true;
    this.page = 0;
    this.following = true;
    this.endOfLoading = false;
    this.all = this.followers = false;
    this.users = [];
    this.load(this.page, this.count, true);
  }

  getFollowers() {
    this.showSpinner = true;
    this.page = 0;
    this.followers = true;
    this.endOfLoading = false;
    this.all = this.following = false;
    this.users = [];
    this.load(this.page, this.count, false, true);
  }

  load(page: number, count: number, following?: boolean, followers?: boolean) {
    this.userService.getAll(page, count, following, followers).subscribe(
      result => {
        if (result.length < count) {
          this.endOfLoading = true;
        }
        this.users.push(...result);
        this.showSpinner = false;
        this.loaded = true;
      },
      console.log
    );
  }

  loadMore() {
    this.page++;

    this.showSpinner = true;

    if (this.all) {
      this.load(this.page, this.count);
    } else if (this.following) {
      this.load(this.page, this.count, true);
    } else if (this.followers) {
      this.load(this.page, this.count, false, true);
    }
  }

}
