import { Component, OnInit } from '@angular/core';
import { Blog } from '../_models/blog';
import { BlogService } from '../_services/blog.service';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  page = 0;
  count = 5
  throttle = 500;
  scrollDistance = 3;
  showSpinner = false;
  endOfLoading = false;

  constructor(private blogService: BlogService, private session: SessionService) {
  }

  ngOnInit(): void {
    this.loadAll(0, this.count);
    this.session.isLoggedIn().subscribe(
      res => this.loggedIn = res,
      console.log
    )
  }

  blogs: Blog[] = [];

  all = true;
  loggedIn = false;

  loaded = false;

  loadAll(page: number, count: number) {
    this.blogService.getAll(page, count).subscribe(
      res => {
        if (!res[0]) {
          this.endOfLoading = true;
        }
        this.blogs.push(...res);
        this.showSpinner = false;
        this.loaded = true;
      },
      console.log
    );
  }

  loadFollowing(page: number, count: number) {
    this.blogService.getFollowing(page, count).subscribe(
      res => {
        if (!res[0]) {
          this.endOfLoading = true;
        }
        this.blogs.push(...res);
        this.showSpinner = false;
        this.loaded = true;
      },
      console.log
    );
  }

  getAll() {
    this.all = true;
    this.endOfLoading = false;
    this.blogs = [];
    this.page = 0;
    this.loadAll(0, this.count);
  }

  getFollowing() {
    this.all = false;
    this.endOfLoading = false;
    this.page = 0;
    this.blogs = [];
    this.loadFollowing(0, this.count);
  }

  loadMore() {

    this.page++;

    this.showSpinner = true;

    if (this.all) {
      this.loadAll(this.page, this.count);
    } else {
      this.loadFollowing(this.page, this.count);
    }
  }

}
