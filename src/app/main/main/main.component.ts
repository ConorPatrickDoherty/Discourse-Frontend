import { Component, OnInit } from '@angular/core';
import { faUser, faChevronDown, faFeatherAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  logo:IconDefinition = faFeatherAlt
  user:IconDefinition = faUser
  dropdown:IconDefinition = faChevronDown
  categories:string[] = [
    'General',
    'Business',
    'Entertainment',
    'Health',
    'Science',
    'Sports',
    'Technology'
  ]
  selectedCategory: Observable<string>

  constructor(private store: Store<{routeReducer: any}>, private router: Router ) {
    this.selectedCategory = this.store.pipe(select('routeReducer'))
  }

  ChangeCategory(category: string) {
    this.router.navigate[category]
    console.log(category);
    this.store.dispatch({
      type: 'CATEGORY_CHANGE',
      payload: category
    })
  }


  ngOnInit() {
  }
}
