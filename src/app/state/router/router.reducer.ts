import { createReducer, on, createAction } from '@ngrx/store'
import { ROUTER_NAVIGATED, RouterRequestAction } from '@ngrx/router-store'

// TODO MUST CLEAN UP ALL CODE
// CREATE SEPERATE TS FILES FOR ALL INTERFACES + ACTION
// DECIDE WHERE TO PUT INITIAL STATE
// MOVE THIS REDUCER INTO FEATURE MODULE USING STOREMODULE.FORFEATURE()

const RouterAction = createAction(ROUTER_NAVIGATED)

const initialState = {
    category: ''
}

interface State {
    category: ''
}

export const routeReducer = createReducer(
    initialState,
    on(RouterAction, (state: State, action: RouterRequestAction) => ({
        ...state,
        category: action.payload.event.url.slice(1).toLowerCase(),

    }))
)
