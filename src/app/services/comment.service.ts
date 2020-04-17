import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private functions: AngularFireFunctions) { }

  CreateComment(comment:string, parentId: string):Observable<Comment> {
    return this._CreateComment({ comment, parentId })
  }

  GetComments(parentId: string): Observable<Comment[]> {
    return this._GetComments({ parentId })
  }

  private _CreateComment = this.functions.httpsCallable('CreateComment')
  private _GetComments = this.functions.httpsCallable('GetComments')
}
