import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDelete } from '../confirm/confirm-component';
import { UploaderComponent } from '../uploader/uploader.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { fade } from '../_animations/fade';
import { Blog } from '../_models/blog';
import { User } from '../_models/user';
import { BlogService } from '../_services/blog.service';
import { SessionService } from '../_services/session.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  animations: [
    fade('fade1', 300),
    fade('fade2', 500),
    fade('fade3', 700),
  ]
})
export class UserProfileComponent implements OnInit {

  page = 0;
  count = 4;

  showSpinner = false;
  endOfLoading = false;

  constructor(public userService: UserService,
    private dialog: MatDialog,
    private session: SessionService,
    private ac: ActivatedRoute,
    private blogService: BlogService
  ) { }

  user: User = new User('');
  currentUser: User = new User();

  avatar = {};
  allowedFiles: string[] = ['image/x-png', 'image/png', 'image/gif', 'image/jpeg']

  blogs: Blog[] = [];

  loaded = false;
  followed = false;
  owned = true;
  invalidFile = false;

  ngOnInit(): void {
    this.session.getLoggedUser().subscribe(
      res => {
        if (res._id === '') {
          return;
        }
        this.currentUser = res;
        this.ac.queryParams.subscribe(
          params => {
            if (params.id && params.id !== '') {
              this.userService.getById(params.id).subscribe(
                res => {
                  this.user = res;
                  this.owned = false;
                  this.followed = this.currentUser.following.includes(
                    this.user._id
                  );
                  this.setAvatar();
                  this.loadBlogs(0, this.count);
                  this.loaded = true;
                },
                console.log
              );
            } else {
              this.user = this.currentUser;
              this.setAvatar();
              this.loadBlogs(0, this.count);
              this.loaded = true;
            }
          },
          console.log
        );
      },
      console.log
    );
  }

  setAvatar() {
    this.avatar = {
      backgroundImage: 'url(' + (this.user.profilePicture || '../../assets/images/profile.png') + ')'
    }
  }

  edit() {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '40em',
      height: '30em',
      data: {
        user: this.user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  follow() {
    this.userService.follow(this.user._id).subscribe(
      res => {
        this.followed = true;
        this.session.loadUser();
      },
      console.log
    )
  }

  unfollow() {
    this.userService.unfollow(this.user._id).subscribe(
      res => {
        this.followed = false;
        this.session.loadUser();
      },
      console.log
    )
  }

  loadBlogs(page: number, count: number) {
    const query = {
      author: this.user._id
    }
    this.blogService.search(query, page, count).subscribe(
      res => this.blogs = res,
      console.log
    );
  }

  appendBlogs(page: number, count: number) {
    const query = {
      author: this.user._id
    }
    this.blogService.search(query, page, count).subscribe(
      res => {
        if (!res[0]) {
          this.endOfLoading = true;
        }
        this.blogs.push(...res)
        this.showSpinner = false;
      },
      console.log
    );
  }

  deleteUser() {
    const dialogRef = this.dialog.open(ConfirmDelete, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete().subscribe(
          res => {
            this.session.logout();
            location.reload();
          },
          console.log
        );
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploaderComponent, {
      width: '40em',
      height: '30em'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.setProfilePicture(result).subscribe(
          res => {
            location.reload();
          },
          console.log
        );
      }
    });
  }

  loadMore() {

    this.page++;

    this.showSpinner = true;

    this.appendBlogs(this.page, this.count);

  }

}

