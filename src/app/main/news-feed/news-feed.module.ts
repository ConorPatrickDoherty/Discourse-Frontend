import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store'

import { NewsFeedRoutingModule } from './news-feed-routing.module';
import { reducers, CustomSerializer } from '../../store'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { MatSelectModule } from '@angular/material/select';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { TrendingComponent } from './trending/trending.component';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleItemComponent,
    NewsFeedComponent,
    TrendingComponent
  ],
  imports: [
    CommonModule,
    NewsFeedRoutingModule,
    StoreModule.forFeature(
      'NewsFeed', 
      reducers
    ),
    StoreRouterConnectingModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomSerializer}
  ]
})
export class NewsFeedModule { }
