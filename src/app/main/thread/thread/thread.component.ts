import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { ThreadService } from 'src/app/services/thread.service';
import { FormControl } from '@angular/forms';
import { Thread } from 'src/app/interfaces/thread';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  Thread: Thread 
  comment: FormControl = new FormControl('')

  constructor(private threads: ThreadService, private ref: ApplicationRef, private comments: CommentService) { }

  ngOnInit() {
    this.threads.Thread.subscribe(x => {
      this.Thread = x
      this.ref.tick()
    })
  }

  Submit() {
    this.comments.CreateComment(this.comment.value, this.Thread.id).subscribe(x => {
      this.comments.GetComments(this.Thread.id).subscribe(x => {
        this.Thread.comments = x
        this.ref.tick()
      })
    })
  }
}
