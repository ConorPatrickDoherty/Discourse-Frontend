import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { ThreadService } from 'src/app/services/thread.service';

import { Article } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { NgZone } from '@angular/core'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  Article: Article 
  comment: FormControl = new FormControl('')

  constructor(private threads: ThreadService, private ref: ApplicationRef) { }

  ngOnInit() {
    this.threads.Thread.subscribe(x => {
      this.Article = x
      console.log('done')
      setTimeout(() => {
        this.ref.tick()
      }, 500)
    })
  }

  Submit() {
    this.threads.CreateComment(this.comment.value).subscribe(x => {
      console.log(x)
    })
  }
}
