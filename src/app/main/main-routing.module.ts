import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MainGuard } from './main.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'newsfeed/en',
    pathMatch: 'full'
  },
  {
    path: 'newsfeed/:language',
    component: MainComponent,
    canActivate: [MainGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./news-feed/news-feed.module').then(m => m.NewsFeedModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
