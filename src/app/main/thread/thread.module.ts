import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreadRoutingModule } from './thread-routing.module';
import { ThreadComponent } from './thread/thread.component';


@NgModule({
  declarations: [
    ThreadComponent
  ],
  imports: [
    CommonModule,
    ThreadRoutingModule
  ]
})
export class ThreadModule { }
