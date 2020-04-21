import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NEWS_API_KEY } from '../../environments/environment'
import { Observable, BehaviorSubject } from 'rxjs';
import { NewsApiResponse } from '../interfaces/news-api-response';
import { Store, select } from '@ngrx/store';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  apiRoot: string = 'https://newsapi.org/v2/top-headlines?'
  Articles: BehaviorSubject<NewsApiResponse> = new BehaviorSubject<NewsApiResponse>(null)

  constructor(
    private functions: AngularFireFunctions, 
    private store: Store<{NewsFeed: any}>
  ) {
    this.store.select('NewsFeed').pipe(select("routerReducer")).subscribe(res => {
      if (res.state.params) {
        let body = { ...res.state.params };
        if (res.state.queryParams.q) body.query = res.state.queryParams.q  
          
        this._GetArticles(body).subscribe(x => {
          this.Articles.next(x)
        })
      }
    });
  }

  private _GetArticles =  this.functions.httpsCallable('GetArticles')

}
