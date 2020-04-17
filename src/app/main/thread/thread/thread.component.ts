import { Component, OnInit,  ApplicationRef } from '@angular/core';
import { ThreadService } from 'src/app/services/thread.service';
import { Thread } from 'src/app/interfaces/thread';
import { Comment } from '../../../interfaces/comment'

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  Thread: Thread 

  constructor(private threads: ThreadService, private ref: ApplicationRef) { }

  ngOnInit() {
    this.threads.Thread.subscribe(x => {
      this.Thread = x
      this.ref.tick()
    })
  }

  refreshComments(event:Comment[]) {
    this.Thread.comments = event;
    this.ref.tick();
  }
}
