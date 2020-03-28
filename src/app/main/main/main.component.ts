import { Component, OnInit } from '@angular/core';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user:IconDefinition = faUser

  constructor() { }

  ngOnInit() {
  }
}
