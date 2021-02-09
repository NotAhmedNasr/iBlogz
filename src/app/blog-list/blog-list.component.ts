import { Component, Input, OnInit } from '@angular/core';
import { fade } from '../_animations/fade';
import { Blog } from '../_models/blog';
import { User } from '../_models/user';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  animations: [
    fade('fade2', 500)
  ]
})
export class BlogListComponent implements OnInit {

  constructor(private session: SessionService) { }

  ngOnInit(): void {
    this.session.getLoggedUser().subscribe(
      res => this.user = res,
      console.log
    );
  }

  user: User = new User();

  @Input('blogs') blogs: Blog[] = [];

  remove(id: string) {
    this.blogs = this.blogs.filter(blog => blog._id !== id);
  }

}
