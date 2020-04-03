import { Component, OnInit } from '@angular/core';
import { NewsApiService } from 'src/app/services/news-api.service';
import { NewsApiResponse } from 'src/app/interfaces/news-api-response';
import { COUNTRY_CODES } from '../../../../assets/api-settings'
import { Observable } from 'rxjs';
import { CountryOption } from 'src/app/interfaces/country-option';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  ArticlesResponse:NewsApiResponse;
  FilterBoxOpen: boolean
  countryForm = new FormControl('')
  countries:CountryOption[] = COUNTRY_CODES
  filteredOptions:Observable<CountryOption>

  constructor(private news: NewsApiService) {
    this.news.Articles.subscribe(res => {
      if (res) {
        this.ArticlesResponse = {
          ...res, 
          //remove distinct articles where URLS matche
          articles: res.articles.filter((v, i, s) => {
            return i === s.findIndex((a) => (a.url === v.url))
          })
        }
      }  
    })
  }

  ngOnInit() {
    this.filteredOptions = this.countryForm.valueChanges.pipe(
      startWith('',
      map(value => {
        const filterValue = value.toString().toLowerCase()
        return this.countries.filter(o => o.toString().toLowerCase().includes(filterValue))
      }))
    )
  }

  ViewFilters() {
    this.FilterBoxOpen = !this.FilterBoxOpen
  }
}
