import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/interfaces/post.model';

// For list
export const loadPosts = createAction('[Post] Load Posts');
export const loadPostsSuccess = createAction('[Post] Load Posts Success', props<{ posts: Post[] }>());
export const loadPostsFailure = createAction('[Post] Load Posts Failure', props<{ error: any }>());

// for one Record
export const loadPost = createAction('[Post] Load Post', props<{ id: number }>());
export const loadPostSuccess = createAction('[Post] Load Post Success', props<{ post: Post[] }>());
export const loadPostFailure = createAction('[Post] Load Post Failure', props<{ error: any }>());

// For add
export const addPost = createAction('[Post] Add Post', props<{ post: Post }>());
export const addPostSuccess = createAction('[Post] Add Post Success', props<{ post: Post }>());
export const addPostFailure = createAction('[Post] Add Post Failure', props<{ error: any }>());

// For update
export const updatePost = createAction('[Post] Update Post', props<{ post: Post }>());
export const updatePostSuccess = createAction('[Post] Update Post Success', props<{ post: Post }>());
export const updatePostFailure = createAction('[Post] Update Post Failure', props<{ error: any }>());

// for delete
export const deletePost = createAction('[Post] Delete Post', props<{ id: number }>());
export const deletePostSuccess = createAction('[Post] Delete Post Success', props<{ id: number }>());
export const deletePostFailure = createAction('[Post] Delete Post Failure', props<{ error: any }>());
