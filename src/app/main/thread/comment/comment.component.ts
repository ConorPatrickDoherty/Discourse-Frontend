import { Component, OnInit, Input, ApplicationRef } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { faChevronDown, faArrowDown, faArrowUp, faReply, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { CommentService } from 'src/app/services/comment.service';
import { VoteService } from 'src/app/services/vote.service';
import { Vote, VoteValue } from 'src/app/interfaces/vote';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() Comment: Comment;
  Replies: Comment[] = [];
  CurrentVote: Vote;
  openComment: IconDefinition = faChevronDown;
  voteUp: IconDefinition = faArrowUp;
  voteDown: IconDefinition = faArrowDown;
  reply: IconDefinition = faReply;
  LocalDate: moment.Moment;
  formOpen:boolean = false;
  repliesOpen: boolean = false;

  constructor(private comments: CommentService, private ref: ApplicationRef, private voting: VoteService) { }

  ngOnInit(): void {
    this.LocalDate = moment.unix(this.Comment.createdAt._seconds);
    this.voting.GetVote(this.Comment.id).subscribe((x) => {
      this.CurrentVote = x
      this.ref.tick()
    })
  }

  LoadChildren(): void {
    this.repliesOpen = !this.repliesOpen;
    if (this.repliesOpen) {
      this.comments.GetComments(this.Comment.id).subscribe(x => {
        this.Replies = x;
        this.ref.tick()
      })
    }
  }

  Reply = (): boolean => this.formOpen = !this.formOpen;

  Reload(event: Comment[]): void {
    this.Replies = event;
    this.formOpen = false;
    this.ref.tick()
  }

  Vote(value: number): void {
    this.voting.VoteForComment(value, this.Comment.id).subscribe()
    if (this.CurrentVote.value === 0) value = value
    else if (this.CurrentVote.value !== value) value = value + value 
    else value = value * -1
    this.CurrentVote.value += value as VoteValue
    this.Comment.score += value
    this.ref.tick()
  }
}
