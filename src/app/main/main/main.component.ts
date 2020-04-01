import { Component, OnInit } from '@angular/core';
import { faUser, faChevronDown, faFeatherAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CATEGORIES } from '../../../assets/api-settings'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  logo:IconDefinition = faFeatherAlt
  user:IconDefinition = faUser
  dropdown:IconDefinition = faChevronDown
  categories:string[] = CATEGORIES
  selectedCategory: Observable<string>

  constructor(private store: Store<{NewsFeed: any}>, private router: Router ) {
    this.selectedCategory = this.store.select('NewsFeed').pipe(select('routeReducer'))
  }

  ngOnInit() {
    
  }
}
