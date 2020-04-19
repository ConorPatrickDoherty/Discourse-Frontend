import { SignInAction} from '../actions/sign-in-action'
import { User } from 'src/app/interfaces/user'
import { createReducer, on } from '@ngrx/store'


const initialState:User = {
    username: '',
    score: 0,
    email: '',
    createdAt: {
        _nanoseconds: 0,
        _seconds: 0
    },
    role: ''
}

export const profileReducer = createReducer(
    initialState,
    on(SignInAction, (state: User, action) => ({
        ...state,
        ...action.payload
    }))
)