import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleAction } from 'src/app/store/news-feed/actions/article-action';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  @Input() Article: Article;

  constructor(private router: Router, private store: Store<{ NewsFeed: any }>) { }

  ngOnInit() {}

  ViewArticle() {
    if (this.Article) {
      this.store.dispatch(articleAction({ payload: this.Article }))
      if(this.Article.url.indexOf('www.') !== -1) this.router.navigate([`thread/${this.Article.url.split('www.')[1].split('/').join('-')}`])
      else this.router.navigate([`thread/${this.Article.url.split('://')[1].split('/').join('-')}`])
    }
  }
}
