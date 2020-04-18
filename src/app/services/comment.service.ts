import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Comment } from '../interfaces/comment';
import { ThreadService } from './thread.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  RootID:string;

  constructor(private functions: AngularFireFunctions, private store: Store<{ NewsFeed: any }>) { 
    this.store.select('NewsFeed').subscribe(res => {
      if (res.routerReducer.state.params.threadId) {
        this.RootID = res.routerReducer.state.params.threadId
        console.log(this.RootID)
      }
    })
  }

  CreateComment(comment:string, parentId: string):Observable<Comment[]> {
    return this._CreateComment({ comment, parentId, rootId: this.RootID })
  }

  GetComments(parentId: string): Observable<Comment[]> {
    return this._GetComments({ parentId })
  }

  private _CreateComment = this.functions.httpsCallable('CreateComment')
  private _GetComments = this.functions.httpsCallable('GetComments')
}
