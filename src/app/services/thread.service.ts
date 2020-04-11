import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Store, select } from '@ngrx/store';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  Article:Observable<Article>;
  loading: Boolean = false

  constructor(private functions: AngularFireFunctions, private store: Store<{ NewsFeed: any }>) {
    this.store.select('NewsFeed').pipe(select("routerReducer")).subscribe(res => {
      this.loading = true
      if (res.state.params.threadId) {
        this.Article = this.functions.httpsCallable('ViewThread')({ threadId: res.state.params.threadId })
      }
    })
  }
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