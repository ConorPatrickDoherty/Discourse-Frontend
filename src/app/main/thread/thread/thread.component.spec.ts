import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreadComponent } from './thread.component';

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
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { authReducers, metaReducers } from 'src/app/store';
import { newsReducers } from 'src/app/store/news-feed/reducers/index'
import { ArticleComponent } from '../article/article.component';
import { CommentComponent } from '../comment/comment.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

let rootReducer:ActionReducerMap<any> = {
  ...authReducers,
  ...newsReducers
}


describe('ThreadComponent', () => {
  let component: ThreadComponent;
  let fixture: ComponentFixture<ThreadComponent>;

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
        MatToolbarModule,
        MatSidenavModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatMenuModule,
        StoreModule.forRoot(
          rootReducer,
          { metaReducers }
        ),
      ],
      declarations: [ 
        CommentFormComponent,
        CommentComponent,
        ThreadComponent,
        ArticleComponent
      ],
      providers: [ 
        { 
          provide: AngularFirestore, useValue: FirestoreStub 
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
