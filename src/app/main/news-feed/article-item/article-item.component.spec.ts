import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleItemComponent } from './article-item.component';

import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { authReducers, metaReducers } from 'src/app/store';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};


describe('ArticleItemComponent', () => {
  let component: ArticleItemComponent;
  let fixture: ComponentFixture<ArticleItemComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        MatProgressSpinnerModule,
        RouterTestingModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        MatSnackBarModule,
        MatInputModule,
        MatCardModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(
          authReducers,
          { metaReducers }
        ),
      ],
      declarations: [ ArticleItemComponent ],
      providers: [ 
        { 
          provide: AngularFirestore, useValue: FirestoreStub 
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
