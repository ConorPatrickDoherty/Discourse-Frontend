import { createReducer, on, createAction } from '@ngrx/store'
import { ROUTER_NAVIGATED, RouterRequestAction } from '@ngrx/router-store'
import { State } from '../../interfaces/redux/state/category'
import { RouterAction } from './router.action'

// MUST CLEAN UP ALL CODE
// TODO DECIDE WHERE TO PUT INITIAL STATE

const initialState = {
    category: '',
    language: ''
}

export const routeReducer = createReducer(
    initialState,
    on(RouterAction, (state: State, action: RouterRequestAction) => ({
        ...state,
        language: action.payload.event.url.split('/')[2],
        category: action.payload.event.url.split('/')[3]
    }))
)
