import { Component, OnInit } from '@angular/core';
import { faUser, faChevronDown, faFeatherAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  logo:IconDefinition = faFeatherAlt
  user:IconDefinition = faUser
  dropdown:IconDefinition = faChevronDown

  constructor() { }

  ngOnInit() {
  }
}
