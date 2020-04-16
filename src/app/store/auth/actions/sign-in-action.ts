import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';

export const SignInAction = createAction(
    'SignIn',
    props<{payload:User}>()
)