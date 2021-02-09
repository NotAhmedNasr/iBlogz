import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from "@angular/material/button";
import { BlogListComponent } from './blog-list/blog-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailsListComponent } from './user-details-list/user-details-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component'
import { MatExpansionModule } from "@angular/material/expansion";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core'
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatRadioModule } from "@angular/material/radio";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ConfirmDelete } from './confirm/confirm-component';
import { FileUploadModule } from 'ng2-file-upload';
import { UploaderComponent } from './uploader/uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogDetailsComponent,
    BlogListComponent,
    UserDetailsComponent,
    UserDetailsListComponent,
    UserProfileComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    BlogAddComponent,
    BlogEditComponent,
    UserEditComponent,
    HomeComponent,
    SearchComponent,
    NotFoundComponent,
    ConfirmDelete,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    FileUploadModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'blogzapp', upload_preset: 'p9ykgngb'}),
  ],
  entryComponents: [
    BlogAddComponent,
    BlogEditComponent,
    UserEditComponent,
    ConfirmDelete,
    UploaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
