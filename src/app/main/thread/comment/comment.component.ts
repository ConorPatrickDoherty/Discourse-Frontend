import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { faChevronDown, faArrowDown, faArrowUp, faReply, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() Comment: Comment;
  Replies: Comment[] = [];
  openComment: IconDefinition = faChevronDown;
  voteUp: IconDefinition = faArrowUp;
  voteDown: IconDefinition = faArrowDown;
  reply: IconDefinition = faReply;
  LocalDate: moment.Moment;
  formOpen:boolean = false;

  constructor(private comments: CommentService) { }

  ngOnInit(): void {
    this.LocalDate = moment.unix(this.Comment.createdAt._seconds);
  }

  LoadChildren() {
    this.comments.GetComments(this.Comment.id).subscribe(x => {
      this.Replies = x
      console.log(x)
    })
    
  }

  Reply = () => this.formOpen = !this.formOpen;
}
