import { Component, OnInit, Input, ApplicationRef, Output, EventEmitter } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { FormControl } from '@angular/forms';
import { Comment } from 'src/app/interfaces/comment';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() replyingToID:string
  @Output() refresh: EventEmitter<Comment[]> = new EventEmitter<Comment[]>()
  comment: FormControl = new FormControl('')

  constructor(private comments: CommentService, private ref: ApplicationRef) { }

  ngOnInit(): void {
  }

  Submit() {
    this.comments.CreateComment(this.comment.value, this.replyingToID).subscribe(x => {
      console.log('brrruhhh ')
      this.refresh.emit(x)
    })
  }
}
