import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { faUser, faChevronDown, faFeatherAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { CATEGORIES } from '../../../assets/api-settings'
import { FormControl } from '@angular/forms';
import { debounce } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  categories:string[] = CATEGORIES;
  selectedCategory: string;
  selectedLanguage: string;
  query = new FormControl('');
  showingProfile:boolean = false;

  logo:IconDefinition = faFeatherAlt;
  user:IconDefinition = faUser;
  dropdown:IconDefinition = faChevronDown;

  constructor(private store: Store<{NewsFeed: any}>, private router: Router, private auth: AuthenticationService ) {
    this.store.select('NewsFeed').pipe(select('routerReducer')).subscribe(res => {
      if (res.state.params.category) 
        this.selectedCategory = res.state.params.category;
      else if (!this.selectedCategory)
        this.selectedCategory = 'General'

      this.selectedLanguage = res.state.params.language || 'en';
      if (res.state.queryParams.q)
        this.query.setValue(res.state.queryParams.q.split('-').join(' '));
    })
    this.query.valueChanges
    .pipe( debounce(() => timer(500)) )
    .subscribe(query => {
      const q = query.split(' ').join('-')
      query !== '' ? this.router.navigate([`newsfeed/${this.selectedLanguage || 'en'}/${this.selectedCategory || 'General'}`], { queryParams: { q } }) : this.router.navigate([])
    })
  }

  ngOnInit() {
 
  }

  ngAfterViewInit() {
    //specify the CDK overlay for this menu as the first one rendered in view
    this.menuTrigger.openMenu();
    this.menuTrigger.closeMenu();
  }

  ChangeCategory = (category:string) => this.router.navigate([`newsfeed/${this.selectedLanguage || 'en'}/${category || 'General'}`], { queryParams: { q: this.query.value } })

  ShowProfile = () => {
      this.showingProfile = true
  }

  HideProfile = () => {
    this.showingProfile = false
  }

  SignOut = () => this.auth.SignOut()
}
