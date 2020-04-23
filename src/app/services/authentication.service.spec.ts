import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { authReducers, metaReducers } from '../store/auth/reducers/index';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      AngularFireModule.initializeApp(environment.firebase),
      MatSnackBarModule,
      StoreModule.forRoot(
        authReducers,
        { metaReducers }
      ),
    ],
    providers: [ 
      { 
        provide: AngularFirestore, useValue: FirestoreStub 
      }
    ]
  }));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
