import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store'
import { reducers, CustomSerializer } from '../store'
import { StoreModule } from '@ngrx/store';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ThreadComponent } from './thread/thread/thread.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    StoreModule.forFeature(
      'NewsFeed', 
      reducers
    ),
    StoreRouterConnectingModule.forRoot(),
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomSerializer}
  ]
})
export class MainModule { }
