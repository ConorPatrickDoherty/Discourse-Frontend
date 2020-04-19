import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MainGuard } from './main.guard';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [MainGuard],
    children: [
      {
        path: '',
        redirectTo: 'newsfeed/en',
        pathMatch: 'full'
      },
      {
        path: 'newsfeed/:language',
        loadChildren: () => import('./news-feed/news-feed.module').then(m => m.NewsFeedModule)
      },
      {
        path: 'thread/:threadId',
        loadChildren: () => import('./thread/thread.module').then(m => m.ThreadModule)        
      },
      {
        path: 'profile',
        loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
