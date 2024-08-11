import { createReducer, on } from '@ngrx/store';
import * as PostActions from './posts.actions';
import { Post } from 'src/app/interfaces/post.model';

export interface PostState {
  posts: Post[];
  selectedPost: Post[] | null;
  loading: boolean;
  error: any;
}

export const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null
};


export const postsReducer = createReducer(
  initialState,
  on(PostActions.loadPosts, state => ({ ...state, loading: true })),
  on(PostActions.loadPostsSuccess, (state, { posts }) => ({ ...state, posts, loading: false })),
  on(PostActions.loadPostsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(PostActions.loadPost, state => ({ ...state, loading: true })),
  on(PostActions.loadPostSuccess, (state, { post }) => ({ ...state, selectedPost: post, loading: false })),
  on(PostActions.loadPostFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(PostActions.addPost, state => ({ ...state, loading: true })),
  on(PostActions.addPostSuccess, (state, { post }) => ({ ...state, posts: [...state.posts, post], loading: false })),
  on(PostActions.addPostFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(PostActions.updatePost, state => ({ ...state, loading: true })),
  on(PostActions.updatePostSuccess, (state, { post }) => ({
    ...state,
    posts: state.posts.map(p => (p.id === post.id ? post : p)),
    loading: false
  })),
  on(PostActions.updatePostFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(PostActions.deletePost, state => ({ ...state, loading: true })),
  on(PostActions.deletePostSuccess, (state, { id }) => ({
    ...state,
    posts: state.posts.filter(p => p.id !== id),
    loading: false
  })),
  on(PostActions.deletePostFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
