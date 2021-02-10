import { Component, OnInit } from '@angular/core';
import { Blog } from '../_models/blog';
import { BlogService } from '../_services/blog.service';
import { SessionService } from '../_services/session.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private session: SessionService, private blogService: BlogService,
    private userService: UserService) { }

  value = '';
  queries = ['title', 'tags', 'author'];
  choice = '0';
  query = {};

  page = 0;
  count = 5
  showSpinner = false;
  endOfLoading = false;

  blogs: Blog[] = [];

  loaded = false;

  notFound = false;

  ngOnInit(): void {
  }

  search(text: string) {
    this.loaded = false;
    this.blogs = [];
    this.page = 0;
    if (this.choice === '2') {
      this.userService.getByUsername(text).subscribe(
        res => {
          if (res._id) {
            this.query = {
              author: res._id
            }
            this.load(0, this.count);
          }
        },
        err => {
          this.notFound = true;
          this.loaded = true;
          this.endOfLoading = true;
        }
      );
    } else {
      this.query = {
        [this.queries[+this.choice]]: text
      }
      this.load(0, this.count);
    }
  }

  load(page: number, count: number) {
    this.showSpinner = true;
    this.endOfLoading = false;
    this.blogService.search(this.query, page, count).subscribe(
      res => {
        if (res.length < count) {
          this.endOfLoading = true;
        }
        this.blogs.push(...res);
        this.loaded = true;
        this.showSpinner = false;
        if (!this.blogs.length) {
          this.notFound = true;
        } else {
          this.notFound = false;
        }
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
