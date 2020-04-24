import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebase } from '../env'
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { authReducers, metaReducers } from './store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AppRoutingModule,
    StoreModule.forRoot(
      authReducers,
      { metaReducers }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production
    }),
    MatSnackBarModule
  ],
  providers: [
    AngularFireAuth,
    {
      provide: REGION,
      useValue: 'europe-west2'
    },
    HttpClientModule,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
