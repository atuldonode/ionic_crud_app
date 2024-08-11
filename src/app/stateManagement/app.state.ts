import { ActionReducerMap } from '@ngrx/store';
import { postsReducer, PostState } from './posts/posts.reducer';
import { authReducer, AuthState } from './auth/auth.state';

export interface AppState {
  auth: AuthState;
  posts: PostState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  posts: postsReducer
};
