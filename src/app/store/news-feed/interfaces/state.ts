import * as fromRouter from '@ngrx/router-store'
import { RouterStateUrl } from './router-state-url';
import { Article } from 'src/app/interfaces/article';

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>,
    articleReducer: Article
}