import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NewsApiService } from 'src/app/services/news-api.service';
import { NewsApiResponse } from 'src/app/interfaces/news-api-response';
import { COUNTRY_CODES } from '../../../../assets/api-settings'
import { Observable } from 'rxjs';
import { CountryOption } from 'src/app/interfaces/country-option';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  ArticlesResponse: NewsApiResponse;
  FilterBoxOpen: boolean
  Country: FormControl = new FormControl({})
  Page: FormControl = new FormControl("WHY")
  pages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  populated:boolean = false;
  
  countries:CountryOption[] = COUNTRY_CODES

  constructor(
    private ref:ChangeDetectorRef,
    public news: NewsApiService,
    private store: Store<{NewsFeed: any}>,
    private routingService: RoutingService 
  ) { }

  ngOnInit() {
    this.store.select('NewsFeed').pipe(select('routerReducer')).subscribe(res => {
      if (!this.populated) {
        this.Page.setValue(+res.state.params.page)
        const country = COUNTRY_CODES.filter(x => x.code === res.state.params.country)[0];
        this.Country.setValue(country)
        
        this.populated = true;
      }
    })
    this.news.Articles.subscribe(res => {
      if (res) {
        this.ArticlesResponse = {
          ...res, 
          //remove duplicate articles where URLS match
          articles: res.articles.filter((v, i, s) => {
            return i === s.findIndex((a) => (a.url === v.url)) && v.url
          })
        }
        this.pages = [1];
        for (let i = 0; i < Math.ceil((res.totalResults - 20) / 20); i++) 
          this.pages.push(i + 2);
        
        this.ref.detectChanges();
      }  
    })
    this.Country.valueChanges.subscribe(c => {
      this.routingService.ChangeCountry(c.code) 
    })
    this.Page.valueChanges.subscribe(p => this.routingService.ChangePage(p))
  }

  ViewFilters() {
    this.FilterBoxOpen = !this.FilterBoxOpen
  }
  
}
