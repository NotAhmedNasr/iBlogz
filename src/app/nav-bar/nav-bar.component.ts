import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { BlogAddComponent } from '../blog-add/blog-add.component';
import { User } from '../_models/user';
import { SessionService } from '../_services/session.service';
import {filter} from 'rxjs/operators'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public dialog: MatDialog, private session: SessionService,
    private router: Router) {
    this.session.isLoggedIn().subscribe(
      res => {
        this.loggedIn = res;
      },
      console.log
    );
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)
          ).subscribe((event) =>
           {
              this.currentUrl = (event as NavigationEnd).url;
           });
    this.session.getLoggedUser().subscribe(
      res => {
        this.user = res;
        this.avatar = this.user.profilePicture || '../../assets/images/profile.png';
      },
      console.log
    );
  }

  value = '';

  avatar = '';

  currentUrl = '';

  user: User = new User();

  loggedIn = false;


  openDialog(): void {
    const dialogRef = this.dialog.open(BlogAddComponent, {
      width: '40em',
      height: '30em'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  logout() {
    this.session.logout();
    this.loggedIn = false;
    location.reload();
  }

}
