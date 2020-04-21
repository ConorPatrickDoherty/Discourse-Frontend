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
  apiRoot:string = 'https://newsapi.org/v2/top-headlines?'
  Articles:BehaviorSubject<NewsApiResponse> = new BehaviorSubject<NewsApiResponse>(null)
  loading:boolean = false

  constructor(private http: HttpClient, private store: Store<{NewsFeed: any}>) {
    this.store.select('NewsFeed').pipe(select("routerReducer")).subscribe(res => {
      this.loading = true
      if (res.state.params) {
        let url = `${this.apiRoot}category=${res.state.params.category}&country=${res.state.params.country}&apiKey=${NEWS_API_KEY}`

        if (res.state.queryParams.q) 
          url = url.concat(`&q=${res.state.queryParams.q.split('-').join('+')}`)              
  
        this.http.get<NewsApiResponse>(url).subscribe(
          A => {
             this.Articles.next(A)
             return this.loading = false
          }
        )
      }
    });
  }
}
