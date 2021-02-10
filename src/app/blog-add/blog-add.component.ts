import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UploaderComponent } from '../uploader/uploader.component';
import { fade } from '../_animations/fade';
import { BlogService } from '../_services/blog.service';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css'],
  animations: [
    fade('fade', 300)
  ]
})
export class BlogAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BlogAddComponent>, private fb: FormBuilder,
    private router: Router, private blogService: BlogService, private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  blogForm: FormGroup = new FormGroup({});

  imageToUpload: File | null = null;

  allowedFiles: string[] = ['image/x-png', 'image/png', 'image/gif', 'image/jpeg']

  invalidFile = false;

  ngOnInit(): void {

    this.blogForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      body: [''],
      photo: [''],
      tags: this.fb.array([]),
    });
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

  add() {
    const blog = this.blogForm.value;
    this.blogService.add(blog).subscribe(
      res => {
        this.openSnackBar()
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

  openSnackBar() {
    this.snackBar.open('Blog was added successfully','' , {
      duration: 1000,
    });
  }
}
