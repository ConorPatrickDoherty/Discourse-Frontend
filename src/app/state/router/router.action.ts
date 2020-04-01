import { createAction } from "@ngrx/store";
import { ROUTER_NAVIGATED } from '@ngrx/router-store';

export const RouterAction = createAction(ROUTER_NAVIGATED)