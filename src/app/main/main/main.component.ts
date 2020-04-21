import { Component, OnInit, ViewChild, ApplicationRef } from '@angular/core';
import { faUser, faChevronDown, faFeatherAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { timer } from 'rxjs';
import { CATEGORIES } from '../../../assets/api-settings'
import { FormControl } from '@angular/forms';
import { debounce } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  categories:string[] = CATEGORIES;

  selectedCategory: string;
  query = new FormControl('');
  showingProfile:boolean = false;

  logo:IconDefinition = faFeatherAlt;
  user:IconDefinition = faUser;
  dropdown:IconDefinition = faChevronDown;

  constructor(
    private store: Store<{NewsFeed: any}>, 
    private routingService: RoutingService,
    private auth: AuthenticationService,
    private ref: ApplicationRef 
  ) { }

  ngOnInit() {
    this.store.select('NewsFeed').pipe(select('routerReducer')).subscribe(res => {
      this.selectedCategory = res.state.params.category || 'General';
      
      if (res.state.queryParams.q) this.query.setValue(
        res.state.queryParams.q.split('-').join(' ')
      );  
    })
    this.query.valueChanges.pipe( 
      debounce(() => timer(500))
    ).subscribe(
      query => this.routingService.ChangeQueryString(query.split(' ').join('-'))
    )
  }

  ngAfterViewInit() {
    //specify the CDK overlay for this menu as the first one rendered in view
    this.menuTrigger.openMenu();
    this.menuTrigger.closeMenu();
  }

  EditProfile() {
    this.showingProfile = false;
  }

  OpenNewsFeed = () => this.routingService.Navigate();
  

  ChangeCategory = (category:string) => this.routingService.ChangeCategory(category);
  

  ShowProfile = () => {
      this.showingProfile = true;
      this.ref.tick()
  }

  HideProfile = () => {
    this.showingProfile = false;
    this.ref.tick();
  }

  SignOut = () => this.auth.SignOut()
}
