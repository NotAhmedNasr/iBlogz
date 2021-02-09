import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BlogEditComponent } from '../blog-edit/blog-edit.component';
import { fade, slide } from '../_animations/fade';
import { Blog } from '../_models/blog';
import { User } from '../_models/user';
import { Comment } from "../_models/comment";
import { SessionService } from '../_services/session.service';
import { BlogService } from '../_services/blog.service';
import { ConfirmDelete } from '../confirm/confirm-component';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
  animations: [
    fade('fadein', 400),
    slide
  ]
})
export class BlogDetailsComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router, private session: SessionService,
    private blogService: BlogService) { }

  ngOnInit(): void {
    this.session.isLoggedIn().subscribe(
      res => this.loggedIn = res,
      console.log
    );

    this.liked = this.isLiked();

    this.likes = this.blog.likers.length;

    this.loaded = true;

    this.avatar = {
      backgroundImage: 'url(' + (this.blog.author?.profilePicture || '../../assets/images/profile.png') + ')'
    }

  }
  @Input('user') user: User = new User();
  @Input('blog') blog: Blog = new Blog('');
  @Output() delete: EventEmitter<void> = new EventEmitter();

  avatar = {}

  commentContent = '';

  // control flags
  comment = false;

  commentList = false;

  loggedIn = false;

  liked = false;

  loaded = false;


  like() {
    this.liked = true;
    this.likes++;
    this.blogService.like(this.blog._id!).subscribe(
      console.log,
      console.log
    );
  }

  searchTag(tag: string) {

  }

  unlike() {
    this.likes--;
    this.liked = false;
    this.blogService.unlike(this.blog._id!).subscribe(
      console.log,
      console.log
    )
  }

  showComment() {
    this.comment = true;
  }

  saveComment() {
    const comment = new Comment(this.commentContent);
    this.blogService.comment(this.blog._id!, comment).subscribe(
      res => {
        this.blog.comments = res.comments;
        this.comment = false;
        this.commentContent = '';
      },
      console.log
    );
  }

  cancelComment() {
    this.comment = false;
    this.commentContent = '';
  }

  likes = 0;

  edit() {
    const dialogRef = this.dialog.open(BlogEditComponent, {
      width: '40em',
      height: '30em',
      data: {
        blog: this.blog
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  isLiked() {
    return this.blog.likers.includes(this.user._id)
  }

  viewAuthor(id = this.blog.author?._id) {
    let options = {};
    if (this.user._id !== id) {
      options = {queryParams: {id: id || this.blog.author?._id}};
    }
    this.router.navigate(['profile/user'], options);
  }

  viewCommenter(id: any) {
    this.router.navigate(['profile/user'], { queryParams: { id: id } });
  }

  deleteComment(id: any) {
    this.blogService.uncomment(this.blog._id!, id).subscribe(
      res => {
        this.blog.comments = res.comments;
        this.comment = false;
        this.commentContent = '';
      },
      console.log
    );
  }

  deleteBlog() {
    const dialogRef = this.dialog.open(ConfirmDelete, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.blogService.delete(this.blog._id!).subscribe(
          res => {
            this.delete.emit();
          },
          console.log
        );
      }
    });
  }

  commenterAvatar(comment: Comment) {
    return {
      backgroundImage: 'url(' + (comment.commenter?.profilePicture || '../../assets/images/profile.png') + ')'
    }
  }

}

