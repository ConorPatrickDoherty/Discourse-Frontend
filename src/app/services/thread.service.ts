import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Store } from '@ngrx/store';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Thread } from '../interfaces/thread';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  Thread:Observable<Thread>

  constructor(private functions: AngularFireFunctions, private store: Store<{ NewsFeed: any }>) {
    this.store.select('NewsFeed').subscribe(res => {
      console.log(res.routerReducer.state.params)
      if (res.routerReducer.state.params.threadId) {
        const body = { threadId: res.routerReducer.state.params.threadId }
        if (res.articleReducer.url != '') body['article'] = res.articleReducer
        if (res.routerReducer.state.params.category) console.log('cat')
        

        this.Thread = this._ViewThread(body).pipe(catchError(err => 
          err.code == 'not-found' ?  'Error getting thread' : 'Error creating new thread'
        ))
      }
    })
  }

  CreateThread(article:Article):Observable<Article> {
    return this._CreateThread({article})
  }

  GetThreads(body):Observable<Thread[]> {
    return this._GetThreads(body);
  }

  private _ViewThread =  this.functions.httpsCallable('ViewThread')
  private _CreateThread = this.functions.httpsCallable('CreateThread')
  private _GetThreads = this.functions.httpsCallable('GetThreads')
}