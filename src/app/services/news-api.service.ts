import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NEWS_API_KEY } from '../../environments/environment'
import { Observable, BehaviorSubject } from 'rxjs';
import { NewsApiResponse } from '../interfaces/news-api-response';
import { Store, select } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  url:string = 'https://newsapi.org/v2/top-headlines?'
  language:string; 
  Articles:BehaviorSubject<NewsApiResponse> = new BehaviorSubject<NewsApiResponse>(null)
  loading:boolean = false

  constructor(private http: HttpClient, private store: Store<{NewsFeed: any}>) {
    this.store.select('NewsFeed').pipe(select("routeReducer")).subscribe(state => {
      this.loading = true
      this.http.get<NewsApiResponse>(`${this.url}category=${state.category || "General"}&language=${state.language}&apiKey=${NEWS_API_KEY} `).subscribe(
        A => {
           this.Articles.next(A)
           return this.loading = false
        }
      )
      
    });
  }
}
