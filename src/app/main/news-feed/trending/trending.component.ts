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
  Threads: Thread[];

  votes: IconDefinition = faExchangeAlt;
  comments: IconDefinition = faComments;


  constructor(
    private ref: ApplicationRef,
    private threads: ThreadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.threads.GetThreads().subscribe(x => {
      this.Threads = x;
      this.ref.tick()
    })
  }

  OpenThread(thread:Thread) {
    this.router.navigate([`thread/${thread.id}`])
  }

}
