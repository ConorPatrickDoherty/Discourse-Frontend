import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Credentials } from '../interfaces/credentials';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isSignedIn: Observable<boolean>

  constructor(private auth: AngularFireAuth, private store: Store<any>, private router: Router, private functions: AngularFireFunctions,) { 
    
  }

  SignIn = (credentials:Credentials) => 
    this.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      this._GetUser({email: credentials.email}).subscribe((user) => {
        console.log(user)
         this.store.dispatch({
          type: 'SignIn',
          payload: user
        })
        this.router.navigate([''])
      })
    })
    .catch((error) => {
      console.log(error.message)
    })

  SignOut =():Promise<void> => this.auth.signOut() 

  SignUp = (credentials:Credentials) => {
    this._CreateUser({credentials}).subscribe(x => {
      this.SignIn(credentials)
    })
  }

  private _CreateUser = this.functions.httpsCallable('CreateUser');
  private _GetUser = this.functions.httpsCallable('GetUser');
}
