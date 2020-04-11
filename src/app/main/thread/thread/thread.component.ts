import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ThreadService } from 'src/app/services/thread.service';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  Article: Article

  constructor(private threads: ThreadService, private changeDetector: ChangeDetectorRef) { 
    this.threads.Article.subscribe(a => {
      this.Article = a;
      this.changeDetector.detectChanges()
    })
  }

  ngOnInit() {
  }
}
