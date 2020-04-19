import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { Vote } from '../interfaces/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private functions: AngularFireFunctions) {}

  VoteForItem(voteValue: number, parentId: string):Observable<number> {
    return this._VoteForItem({ voteValue, parentId })
  }

  GetVote(parentId: string):Observable<Vote> {
    return this._GetVote({ parentId })
  }

  private _VoteForItem = this.functions.httpsCallable('VoteForItem')
  private _GetVote = this.functions.httpsCallable('GetVoteByParent')
}
