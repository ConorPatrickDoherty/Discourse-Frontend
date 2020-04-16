import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import { ActionReducerMap } from '@ngrx/store'

import * as fromRouter from '@ngrx/router-store'
import { Injectable } from "@angular/core";
import { articleReducer } from './article-reducer';
import { RouterStateUrl } from '../interfaces/router-state-url';
import { State } from '../interfaces/state';

export const newsReducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
    articleReducer: articleReducer
} 

@Injectable()
export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
    serialize(routerState:RouterStateSnapshot): RouterStateUrl {
        const { url } = routerState;
        const { queryParams } = routerState.root
        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild
        }
        const { params } = state;
        return { url, queryParams, params };
    }
}