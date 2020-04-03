import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  @Input() Article: Article;

  constructor() { }

  ngOnInit() {
  }

  ViewArticle() {
    console.log(this.Article.url.split('https://')[1])
  }
}
