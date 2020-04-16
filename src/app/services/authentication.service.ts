import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Credentials } from '../interfaces/credentials';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isSignedIn: Observable<boolean>

  constructor(private auth: AngularFireAuth, private store: Store<any>, private router: Router) { 
    // this.auth.onAuthStateChanged((user) => {
    //   if (!user) {
    //     this.store.dispatch({
    //       type: 'SIGN_IN',
    //       payload: null
    //     })
    //   }
    // })
  }

  SignedInUser = (): Promise<User> => this.auth.currentUser

  SignIn = (credentials:Credentials) => 
    this.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((credential) => {
      this.store.dispatch({
        type: 'SIGN_IN',
        payload: {
          uid: credential.user.uid,
          email: credential.user.email,
          displayName: credential.user.displayName,
          photoURL: credential.user.photoURL
        } 
      })
      this.router.navigate([''])
    })
    .catch(function(error) {
      console.log(error.message)
    })

  SignOut =():Promise<void> => this.auth.signOut() 

  SignUp = (credentials:Credentials): Promise<firebase.auth.UserCredential> => this.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
}
