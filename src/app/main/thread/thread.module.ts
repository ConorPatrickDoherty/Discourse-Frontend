import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreadRoutingModule } from './thread-routing.module';
import { ThreadComponent } from './thread/thread.component';

import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { ArticleComponent } from './article/article.component';


@NgModule({
  declarations: [
    ThreadComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    ThreadRoutingModule,
  ]
})
export class ThreadModule { }
