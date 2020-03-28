import { Component, OnInit } from '@angular/core';
import { NewsApiService } from 'src/app/services/news-api.service';
import { NewsApiResponse } from 'src/app/interfaces/news-api-response';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  ArticlesList:NewsApiResponse

  constructor(private news: NewsApiService) { 
    this.news.getMainQuery().subscribe(a => this.ArticlesList = a);
  }

  ngOnInit() {

  }
}
