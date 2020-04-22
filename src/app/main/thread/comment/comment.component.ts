import { Component, OnInit, Input, ApplicationRef } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { faChevronDown, faArrowDown, faArrowUp, faReply, faEllipsisV, faLock, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { CommentService } from 'src/app/services/comment.service';
import { VoteService } from 'src/app/services/vote.service';
import { Vote, VoteValue } from 'src/app/interfaces/vote';
import { Store } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() Comment: Comment;
  Replies: Comment[] = [];
  CurrentVote: Vote;
  LocalDate: moment.Moment;
  LoggedInEmail: string;
  canEdit:boolean = false;
  formOpen:boolean = false;
  repliesOpen: boolean = false;

  openComment: IconDefinition = faChevronDown;
  voteUp: IconDefinition = faArrowUp;
  voteDown: IconDefinition = faArrowDown;
  reply: IconDefinition = faReply;
  menu: IconDefinition = faEllipsisV;
  trash: IconDefinition = faTrashAlt;
  lock: IconDefinition = faLock;

  constructor(
    private comments: CommentService, 
    private ref: ApplicationRef, 
    private voting: VoteService,
    private store: Store<{ profileReducer: User }>,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.Comment) {
      this.store.select('profileReducer').subscribe(res => {
        this.LoggedInEmail = res.email
        if (res && (res.email === this.Comment.user.email || res.role === "Admin")) {
          this.canEdit = true;
        }
      })
  
      this.LocalDate = moment.unix(this.Comment.createdAt._seconds);
      this.voting.GetVote(this.Comment.id).subscribe((x) => {
        this.CurrentVote = x
        this.ref.tick()
      })
    } 
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

  Reply() {
    if (!this.Comment.locked && !this.Comment.deleted) {
      console.log('rep')
      return this.formOpen = !this.formOpen;
    } 
    const message = this.Comment.deleted ? 'has been deleted' : 'is locked' 
    this.snackbar.open(`As this comment thread ${message}, you can no longer reply to it`, 'Close', {
      duration: 2000,
    });
  }

  Reload(event: Comment[]): void {
    this.Replies = event;
    this.Comment.replyCount = event.length;
    this.formOpen = false;
    this.repliesOpen = true;
    this.ref.tick()
  }

  Vote(value: number): void {
    this.voting.VoteForItem(value, this.Comment.id).subscribe()
    if (this.CurrentVote.value === 0) value = value
    else if (this.CurrentVote.value !== value) value = value + value 
    else value = value * -1
    this.CurrentVote.value += value as VoteValue
    this.Comment.score += value
    this.ref.tick()
  }

  Delete() {
    this.comments.DeleteComment(this.Comment.id).subscribe((x) => {
      this.Replies = x;
      console.log(x)
      this.Comment.deleted = true;
      this.ref.tick()
    });
  }

  Lock() {
    this.comments.LockComment(this.Comment.id).subscribe((x) => {
      this.Replies = x;
      console.log(x)
      this.Comment.locked = true;
      this.ref.tick()
    });
  }
}
