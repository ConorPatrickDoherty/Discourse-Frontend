import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';
import { IconDefinition, faPen, faUpload, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  User: User;
  file:File;
  ImagePlaceholder:string;
  UserDetails: FormGroup;

  isEditing:boolean = false;
  isUpdating: boolean = false;
  hoverStyle:boolean = false;
  gotUser:boolean = false;

  edit: IconDefinition = faPen;
  upload: IconDefinition = faUpload;
  cancel: IconDefinition = faTimes;
  user: IconDefinition = faUser;
  

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ profileReducer: User }>, 
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.store.select('profileReducer').subscribe(res => {
      if (res) {
        this.User = res
        if (!this.gotUser) {
          this.auth.GetUserDetails(this.User.email).subscribe((x) => {
            this.User = x;
            this.store.dispatch({
              type: 'SignIn',
              payload: this.User
            })
          })
          this.gotUser = true
        }
        this.UserDetails = this.formBuilder.group({
          username: res.username,
          bio: res.bio
        })
      }
    })
  }

  EnableEditing() {
    this.isEditing = !this.isEditing
  }

  UploadImage(event) {
    this.file = event
    const reader = new FileReader()
    reader.onload = (event) => {
      this.ImagePlaceholder = event.target.result as string;
    }
    reader.readAsDataURL(event)
  }

  UpdateProfile() {
    this.isUpdating = true;
    this.auth.UpdateProfile(
      this.ImagePlaceholder, 
      this.UserDetails.get('username').value, 
      this.UserDetails.get('bio').value
    ).subscribe(x => {
      this.store.dispatch({
        type: 'SignIn',
        payload: this.User
      })
      this.User = x;
      this.isUpdating = false;
      this.isEditing = false;
    })
  }

  Hover(event:boolean) {
    this.hoverStyle = event
  }

}
