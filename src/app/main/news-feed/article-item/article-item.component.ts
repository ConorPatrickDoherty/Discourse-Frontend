import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  @Input() Article: Article;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ViewArticle() {
    this.router.navigate([`thread/${this.Article.url.split('://')[1].split('/').join('-')}`])
  }
}
