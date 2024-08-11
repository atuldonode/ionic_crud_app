// src/app/store/auth/auth.state.ts
import { createReducer, on, createAction, createSelector, props } from '@ngrx/store';

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Actions
export const login = createAction('[Auth] Login', (username: any, password: any) =>({username, password}));
export const loginSuccess = createAction('[Auth] Login Success', (user: any, token: string) => ({ user, token }));
export const logoutSuccess = createAction('[Auth] Logout Success');

// Reducer
export const authReducer = createReducer(
  initialAuthState,
  on(login, (state, { username, password }) => ({
    ...state,
    isAuthenticated: true,
    username,
    password,
  })),
  on(loginSuccess, (state, { user, token }) => ({
    ...state,
    isAuthenticated: true,
    user,
    token,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    token: null,
  }))
);

// Selectors
export const selectAuthState = (state: any) => state.auth;
export const selectIsAuthenticated = createSelector(selectAuthState, (state: AuthState) => state.isAuthenticated);
export const selectUser = createSelector(selectAuthState, (state: AuthState) => state.user);
export const selectToken = createSelector(selectAuthState, (state: AuthState) => state.token);
