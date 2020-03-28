import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NEWS_API_KEY } from '../../environments/environment'
import { Observable } from 'rxjs';
import { NewsApiResponse } from '../interfaces/news-api-response';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(private http: HttpClient) { }

  getMainQuery =  (): Observable<NewsApiResponse> => this.http.get<NewsApiResponse>(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${NEWS_API_KEY} `)
}
