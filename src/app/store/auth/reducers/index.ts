import { profileReducer } from './profile-reducer'
import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store'
import { State } from '../interfaces/state'
import { localStorageSync } from 'ngrx-store-localstorage';

export const authReducers: ActionReducerMap<State> = {
    profileReducer
} 

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: ['profileReducer'], rehydrate: true })(reducer);
}
  
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
   