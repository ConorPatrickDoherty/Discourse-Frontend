import { Component, OnInit, Input } from '@angular/core';
import { faComments, IconDefinition, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Thread } from 'src/app/interfaces/thread';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() Thread: Thread;
  Comment:IconDefinition = faComments;
  VoteUp: IconDefinition = faArrowUp;
  VoteDown: IconDefinition = faArrowDown;

  constructor() { }

  ngOnInit(): void {
  }

}
