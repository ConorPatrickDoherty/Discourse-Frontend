import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreadRoutingModule } from './thread-routing.module';
import { ThreadComponent } from './thread/thread.component';

import { ArticleComponent } from './article/article.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ThreadComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    ThreadRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ThreadModule { }
