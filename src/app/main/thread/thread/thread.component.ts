import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { ThreadService } from 'src/app/services/thread.service';

import { Article } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { NgZone } from '@angular/core'
import { FormControl } from '@angular/forms';
import { Thread } from 'src/app/interfaces/thread';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  Thread: Thread 
  comment: FormControl = new FormControl('')

  constructor(private threads: ThreadService, private ref: ApplicationRef) { }

  ngOnInit() {
    this.threads.Thread.subscribe(x => {
      this.Thread = x
      console.log(x)
      this.ref.tick()
    })
  }

  Submit() {
    this.threads.CreateComment(this.comment.value, this.Thread.id).subscribe(x => {
      console.log(x)
    })
  }
}
