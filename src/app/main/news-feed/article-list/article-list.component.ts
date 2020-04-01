import { Component, OnInit } from '@angular/core';
import { NewsApiService } from 'src/app/services/news-api.service';
import { NewsApiResponse } from 'src/app/interfaces/news-api-response';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  ArticlesResponse:NewsApiResponse;

  constructor(private news: NewsApiService) {
    this.news.Articles.subscribe(s => {
      this.ArticlesResponse = s
      console.log(s)
    })
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    
  }
}
