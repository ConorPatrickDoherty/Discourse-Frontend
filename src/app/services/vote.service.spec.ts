import { TestBed } from '@angular/core/testing';
import { VoteService } from './vote.service';

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

describe('VoteService', () => {
  let service: VoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    });
    service = TestBed.inject(VoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
