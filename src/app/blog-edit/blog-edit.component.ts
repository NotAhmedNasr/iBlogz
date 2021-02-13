import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UploaderComponent } from '../uploader/uploader.component';
import { fade } from '../_animations/fade';
import { Blog } from '../_models/blog';
import { BlogService } from '../_services/blog.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
  animations: [
    fade('fade', 300)
  ]
})
export class BlogEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BlogEditComponent>, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { blog: Blog },
    private router: Router, private blogService: BlogService, public dialog: MatDialog) { }

  blogForm: FormGroup = new FormGroup({});

  toEditBlog: Blog = new Blog('');

  imageToUpload: File | null = null;

  allowedFiles: string[] = ['image/x-png', 'image/png', 'image/gif', 'image/jpeg']

  invalidFile = false;

  ngOnInit(): void {
    this.toEditBlog = this.data.blog;
    this.blogForm = this.fb.group({
      title: [this.toEditBlog.title, [
        Validators.required,
        Validators.maxLength(100)
      ]],
      body: [this.toEditBlog.body],
      photo: [this.toEditBlog.photo],
      tags: this.fb.array([]),
    });

    this.toEditBlog.tags.forEach(tag => this.tags.push(this.fb.control(tag)));

  }

  get title() {
    return this.blogForm.get('title');
  }
  get body() {
    return this.blogForm.get('body');
  }
  get photo() {
    return this.blogForm.get('photo');
  }
  get tags() {
    return this.blogForm.get('tags') as FormArray;
  }

  addTag() {
    if (this.tags.length < 9) {
      const tag = this.fb.control('', [
        Validators.required
      ]);
      this.tags.push(tag);
    }
  }

  deleteTag(i: number) {
    this.tags.removeAt(i);
  }

  close() {
    this.dialogRef.close();
  }

  edit() {
    const blog = this.blogForm.value;
    this.blogService.edit(this.toEditBlog._id!, blog).subscribe(
      res => {
        location.reload();
        this.router.navigateByUrl('');
      },
      console.log
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploaderComponent, {
      width: '40em',
      height: '30em'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.photo?.setValue(result);
      }
    });
  }

  removeImage() {
    this.photo?.setValue('');
  }

}
