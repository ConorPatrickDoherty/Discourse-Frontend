import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/app/interfaces/thread';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  Threads: Thread[];

  constructor(private threads: ThreadService) { }

  ngOnInit() {
    this.threads.GetThreads().subscribe(x => {
      console.log(x)
      this.Threads = x;
    })
  }

}
