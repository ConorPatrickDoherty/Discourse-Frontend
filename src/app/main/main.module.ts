import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ArticleListComponent } from './news-feed/article-list/article-list.component';
import { ArticleItemComponent } from './news-feed/article-item/article-item.component';
import { NewsFeedComponent } from './news-feed/news-feed/news-feed.component';


@NgModule({
  declarations: [
    MainComponent,
    ArticleListComponent,
    ArticleItemComponent,
    NewsFeedComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    MatSidenavModule
  ]
})
export class MainModule { }
