import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UploaderComponent } from '../uploader/uploader.component';
import { fade } from '../_animations/fade';
import { Blog } from '../_models/blog';
import { BlogService } from '../_services/blog.service';
import { SessionService } from '../_services/session.service';

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
    @Inject(MAT_DIALOG_DATA) public data: { blog: Blog }, private session: SessionService,
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
        Validators.required
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

  uploadimage(input: any) {
    const files: FileList = (input as HTMLInputElement).files as FileList;

    if (files[0] && files[0].type !== undefined && this.allowedFiles.includes(files[0].type) && files[0].size < 20000000) {
      this.imageToUpload = files[0];
      this.invalidFile = false;
    } else {
      this.invalidFile = true;
      this.imageToUpload = null;
    }

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
