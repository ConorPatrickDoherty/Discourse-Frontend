import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Store, select } from '@ngrx/store';
import { Article } from '../interfaces/article';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  Article:Observable<Article> = new Observable();

  constructor(private functions: AngularFireFunctions, private store: Store<{ NewsFeed: any }>) {
    this.store.select('NewsFeed').subscribe(res => {
      if (res.routerReducer.state.params.threadId) {
        this.Article = this._ViewThread({ threadId: res.routerReducer.state.params.threadId }).pipe(catchError(err => 
          err.code == 'not-found' && res.articleReducer.url != '' ? this.CreateThread(res.articleReducer) : 'Error creating new thread'
        ))
      }
    })
  }

  CreateThread(article:Article):Observable<Article> {
    return this._CreateThread({article})
  }

  _ViewThread =  this.functions.httpsCallable('ViewThread')
  _CreateThread = this.functions.httpsCallable('CreateThread')
}


// constructor(private functions: AngularFireFunctions, private store: Store<{ NewsFeed: any }>) { 
//   this.sub = []
//   console.log('begin')
//   this.sub.push(
//     this.store.select('NewsFeed').pipe(select("routerReducer")).subscribe(res => {
//       console.log(res)
//       if (res.state.params) {
//         this.sub.push(
//           this.functions.httpsCallable('ViewThread')({ threadId: res.state.params.threadId }).subscribe(res => {
//             console.log(res)
//           })
//         )
//       }
//     })
//   )
// }

// dispose() {
//   this.sub.forEach(s => s.unsubscribe())
// }