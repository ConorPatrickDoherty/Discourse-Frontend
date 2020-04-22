import { Component, OnInit, Input, ApplicationRef } from '@angular/core';
import { faComments, IconDefinition, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Thread } from 'src/app/interfaces/thread';
import { Vote, VoteValue } from 'src/app/interfaces/vote';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() Thread: Thread;
  Comment:IconDefinition = faComments;
  CurrentVote: Vote;
  VoteUp: IconDefinition = faArrowUp;
  VoteDown: IconDefinition = faArrowDown;

  constructor(private ref: ApplicationRef, private voting: VoteService) { }

  ngOnInit(): void {
    if (this.Thread) {
      this.voting.GetVote(this.Thread.id).subscribe((x) => {
        this.CurrentVote = x
        this.ref.tick()
      })
    }
  }

  Vote(value:number): void {
    this.voting.VoteForItem(value, this.Thread.id).subscribe()
    if (this.CurrentVote.value === 0) value = value
    else if (this.CurrentVote.value !== value) value = value + value 
    else value = value * -1
    this.CurrentVote.value += value as VoteValue
    this.Thread.score += value
    this.ref.tick()
  }

}
