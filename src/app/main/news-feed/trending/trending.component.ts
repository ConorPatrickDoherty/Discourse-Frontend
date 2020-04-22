import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Thread } from 'src/app/interfaces/thread';
import { ThreadService } from 'src/app/services/thread.service';
import { IconDefinition, faComments, faExchangeAlt  } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  Threads: Thread[] = [];
  Index:number = 0;
  LoadFinished = false;
  loadingThreadsArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]       

  votes: IconDefinition = faExchangeAlt;
  comments: IconDefinition = faComments;


  constructor(
    private ref: ApplicationRef,
    private threads: ThreadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.LoadThreads()
  }

  OpenThread(thread:Thread) {
    this.router.navigate([`thread/${thread.id}`])
  }

  LoadThreads(index?: number) {
    let body:any = {}
    if (index)  {
      this.Index = this.Index + index;
      body.index = this.Index;
    }
    this.threads.GetThreads(body).subscribe(x => {
      this.Threads = this.Threads.concat(x);
      if (x.length < 10) this.LoadFinished = true;
      this.ref.tick()
    })
  }
}
