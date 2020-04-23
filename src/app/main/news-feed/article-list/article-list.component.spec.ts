import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleListComponent } from './article-list.component';

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
import { authReducers, metaReducers, newsReducers } from 'src/app/store';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ArticleItemComponent } from '../article-item/article-item.component';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};


describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        MatProgressSpinnerModule,
        RouterTestingModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
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
        StoreModule.forFeature(
          'NewsFeed', 
          newsReducers
        ),
      ],
      declarations: [ 
        ArticleItemComponent,
        ArticleListComponent 
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
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
