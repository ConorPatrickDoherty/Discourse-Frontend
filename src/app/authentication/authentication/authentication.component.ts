import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private router:Router, private store: Store<any>, private auth: AuthenticationService) {
    this.store.pipe(select('auth')).subscribe(
      user => {
        if (user) this.router.navigate([''])
      }
    )
  }

  async ngOnInit() {
  }

}
