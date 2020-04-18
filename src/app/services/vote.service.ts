import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { Vote } from '../interfaces/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private functions: AngularFireFunctions) {}

  VoteForComment(voteValue: number, commentId: string):Observable<number> {
    return this._VoteForComment({ voteValue, commentId })
  }

  GetVote(parentId: string):Observable<Vote> {
    return this._GetVote({ parentId })
  }

  private _VoteForComment = this.functions.httpsCallable('VoteForComment')
  private _GetVote = this.functions.httpsCallable('GetVoteByParent')
}
