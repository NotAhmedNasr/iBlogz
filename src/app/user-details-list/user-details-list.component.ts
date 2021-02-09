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

  page = 0;
  count = 2;
  endOfLoading = false;
  showSpinner = false;

  constructor(private userService: UserService, private session: SessionService) { }

  ngOnInit(): void {
    this.load(0, this.count);
    this.session.getLoggedUser().subscribe(
      res => this.currentUser = res,
      console.log
    );
  }

  users: User[] = [];

  currentUser: User = new User();

  displayedUsers: User[] = [];

  all = true;

  loaded = false;

  getAll() {
    this.all = true;
    this.displayedUsers = this.users;
  }

  getFollowing() {
    this.all = false;
    this.displayedUsers = this.users.filter(user => this.currentUser.following.includes(user._id));
  }

  load(page: number, count: number) {
    this.userService.getAll(page, count).subscribe(
      result => {
        if (!result[0]) {
          this.endOfLoading = true;
        }
        this.users.push(...result);
        if (this.all) {
          this.getAll()
        } else {
          this.getFollowing();
        }
        this.showSpinner = false;
        this.loaded = true;
      },
      console.log
    );
  }

  loadMore() {
    this.page++;

    this.showSpinner = true;

    this.load(this.page, this.count);
  }

}
