import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Thread } from 'src/app/interfaces/thread';
import { ThreadService } from 'src/app/services/thread.service';
import { IconDefinition, faComments, faExchangeAlt  } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  Threads: Thread[] = [];
  SortField: FormControl = new FormControl('replyCount');
  SortRange: FormControl = new FormControl('week');

  Index:number = 0;
  LoadFinished = false;
  loadingThreadsArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  showFilters: boolean = false;

  votes: IconDefinition = faExchangeAlt;
  comments: IconDefinition = faComments;


  constructor(
    private ref: ApplicationRef,
    private threads: ThreadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.LoadThreads()
    this.SortField.valueChanges.subscribe(v => {
      this.Index = 0;
      this.LoadFinished = false;
      this.LoadThreads()
    })
    this.SortRange.valueChanges.subscribe(v => {
      this.Index = 0;
      this.LoadFinished = false;
      this.LoadThreads()
    })
  }

  OpenThread(thread:Thread) {
    if (this.Threads.length)
      this.router.navigate([`thread/${thread.id}`])
  }

  LoadThreads(index?: boolean) {
    let body:any = {}
    if (index)  {
      this.Index = this.Index + this.Threads.length;
      body.index = this.Index;
    }
    if (this.SortField.value) body.sortField = this.SortField.value;
    if (this.SortRange.value) body.sortRange = this.SortRange.value;
    console.log(body)

    this.threads.GetThreads(body).subscribe(x => {
      if (index) this.Threads = this.Threads.concat(x);
      else this.Threads = x;
      console.log(x)
      if (x.length === 0) this.LoadFinished = true;
      this.ref.tick()
    })
  }

  ToggleFilters() {
    this.showFilters = !this.showFilters
  }
}
