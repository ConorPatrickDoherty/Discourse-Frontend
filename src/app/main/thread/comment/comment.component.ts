import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { faChevronDown, faArrowDown, faArrowUp, faReply, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() Comment: Comment;
  openComment: IconDefinition = faChevronDown;
  voteUp: IconDefinition = faArrowUp;
  voteDown: IconDefinition = faArrowDown;
  reply: IconDefinition = faReply;
  LocalDate: moment.Moment;

  constructor() { }

  ngOnInit(): void {
    this.LocalDate = moment.unix(this.Comment.createdAt._seconds);
  }

  LoadChildren() {
    console.log('load children here')
  }

  Reply() {
    console.log('reply here')
  }
}
