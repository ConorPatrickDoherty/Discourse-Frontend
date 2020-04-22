import { Injectable, ApplicationRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Credentials } from '../interfaces/credentials';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loadingLogin: boolean = false;
  loadingSignUp: boolean = false;
  isSignedIn: Observable<boolean>

  constructor(
    private snackBar: MatSnackBar,
    private ref: ApplicationRef,
    private auth: AngularFireAuth, 
    private store: Store<any>, 
    private router: Router, 
    private functions: AngularFireFunctions
  ) { }

  SignIn = (credentials:Credentials) => {
    this.loadingLogin = true;
    this.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      this._GetUser({email: credentials.email}).subscribe((user) => {
        this.store.dispatch({
          type: 'SignIn',
          payload: user
        })
        this.router.navigate(['newsfeed/ie/General/1'])
        this.loadingLogin = false;
      })
    })
    .catch((error) => {
      let snackbarMessage = "A User with this email does not exist"
      if (error.code == "auth/wrong-password") snackbarMessage = "Incorrect Password"
      this.snackBar.open(snackbarMessage, 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      })
      this.loadingLogin = false;
      this.loadingSignUp = false;
      console.log(error)
    })
  }
    

  SignOut =():Promise<void> => {
    return this.auth.signOut().then(x => {
      this.store.dispatch({
        type: 'SignIn',
        payload: {
          username: '',
          score: 0,
          email: '',
          createdAt: {
            _seconds: 0,
            _nanoseconds: 0
          },
          role: '',
          bio: '',
          displayPicture: ''
        }
      })
      // this.store.dispatch({
      //   type: ''
      // })
    })
  } 

  SignUp = (credentials:Credentials) => {
    this.loadingSignUp = true;
    this._CreateUser({credentials}).toPromise().catch((err) => {
      this.snackBar.open(err.message, 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      })
      this.loadingSignUp = false;
    }).then(x => {
      if (this.loadingSignUp) {
        this.SignIn(credentials);
      }
    })
  }

  GetUserDetails(email:string) {
    return this._GetUser({email})
  }

  UpdateProfile(imageString: string, username: string, bio: string ):Observable<any> {
    return this._UpdateProfile({imageString, username, bio})
  }

  private _CreateUser = this.functions.httpsCallable('CreateUser');
  private _GetUser = this.functions.httpsCallable('GetUser');
  private _UpdateProfile = this.functions.httpsCallable('UpdateProfile')
}
