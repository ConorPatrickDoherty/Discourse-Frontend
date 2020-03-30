import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NEWS_API_KEY } from '../../environments/environment'
import { Observable } from 'rxjs';
import { NewsApiResponse } from '../interfaces/news-api-response';
import { Store, select } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  url:string = 'https://newsapi.org/v2/top-headlines?'
  category:Observable<string>

  constructor(private http: HttpClient, private store: Store<{routeReducer: any}>) {
    this.store.pipe(select("routeReducer")).subscribe(q => {
      console.log(q)
    });
  }

  getMainQuery =  (): Observable<NewsApiResponse> => this.http.get<NewsApiResponse>(`${this.url}q=bitcoin&category=business&apiKey=${NEWS_API_KEY} `)
}
