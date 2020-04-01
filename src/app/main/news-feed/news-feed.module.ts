import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsFeedRoutingModule } from './news-feed-routing.module';
import { routeReducer } from '../../state/router/router.reducer'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { MatSelectModule } from '@angular/material/select';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { TrendingComponent } from './trending/trending.component';
import { StoreModule } from '@ngrx/store';

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
      { routeReducer }
    ),
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class NewsFeedModule { }
