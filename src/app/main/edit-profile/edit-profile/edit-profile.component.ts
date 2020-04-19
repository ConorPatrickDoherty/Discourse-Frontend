import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  User: User;

  constructor(private store: Store<{ profileReducer: User }>) { }

  ngOnInit(): void {
    this.store.select('profileReducer').subscribe(res => {
      if (res) {
        this.User = res
      }
    })
  }

}
