import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { authReducers, metaReducers } from 'src/app/store/auth/reducers/index'
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,
        StoreModule.forRoot(
          authReducers,
          { metaReducers }
        ),
    ],
      providers: [ 
        { 
          provide: AngularFirestore, useValue: FirestoreStub 
        },
        AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
