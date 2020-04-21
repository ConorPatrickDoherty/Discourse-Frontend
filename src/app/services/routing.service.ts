import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  selectedCategory: string;
  selectedCountry: string;
  query: string;

  constructor(
    private router: Router, 
    private store: Store<{NewsFeed: any}> 
  ) { 
    this.store.select('NewsFeed').pipe(select('routerReducer')).subscribe(res => {
      this.selectedCategory = res.state.params.category || 'General';
      this.selectedCountry = res.state.params.country || 'ie'
      
      if (res.state.queryParams.q) this.query = res.state.queryParams.q.split('-').join(' ')
    })
  }

  ChangeQueryString(query: string) {
    this.query = query
    this.Navigate()
  }

  Navigate() {
    let queryParams = {}
    if (this.query && this.query.length) queryParams = { q: this.query }
    this.router.navigate([`newsfeed/${this.selectedCountry || 'en'}/${this.selectedCategory || 'General'}`], { queryParams });
  }
  
  ChangeCountry(country: string) {
    this.selectedCountry = country;
    this.Navigate()
  }

  ChangeCategory(category: string) {
    this.selectedCategory = category
    this.Navigate()
  }
}