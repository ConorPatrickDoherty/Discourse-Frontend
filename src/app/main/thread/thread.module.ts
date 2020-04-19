import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreadRoutingModule } from './thread-routing.module';
import { ThreadComponent } from './thread/thread.component';

import { ArticleComponent } from './article/article.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './comment/comment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import 'hammerjs'; 

@NgModule({
  declarations: [
    ThreadComponent,
    ArticleComponent,
    CommentComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    ThreadRoutingModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ]
})
export class ThreadModule { }
