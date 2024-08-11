
import { Injectable } from '@angular/core';
import * as PostActions from './posts.actions';
import { PostsService } from 'src/app/services/posts.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private postService: PostsService
  ) { }

  loadPosts$ = createEffect(() => this.actions$.pipe(
    ofType(PostActions.loadPosts),
    mergeMap(() => this.postService.getPosts()
      .pipe(
        map(posts => PostActions.loadPostsSuccess({ posts })),
        catchError(error => of(PostActions.loadPostsFailure({ error })))
      )
    )
  ));

  loadPostDetails$ = createEffect(() => this.actions$.pipe(
    ofType(PostActions.loadPost),
    mergeMap(action => this.postService.getPostsDetails(action.id)
      .pipe(
        map(post => PostActions.loadPostSuccess({ post })),
        catchError(error => of(PostActions.loadPostFailure({ error })))
      )
    )
  ));

  addPost$ = createEffect(() => this.actions$.pipe(
    ofType(PostActions.addPost),
    mergeMap(action => this.postService.addPost(action.post)
      .pipe(
        map(post => PostActions.addPostSuccess({ post })),
        catchError(error => of(PostActions.addPostFailure({ error })))
      )
    )
  ));

  updatePost$ = createEffect(() => this.actions$.pipe(
    ofType(PostActions.updatePost),
    mergeMap(action => this.postService.updatePost(action.post)
      .pipe(
        map(post => PostActions.updatePostSuccess({ post })),
        catchError(error => of(PostActions.updatePostFailure({ error })))
      )
    )
  ));

  deletePost$ = createEffect(() => this.actions$.pipe(
    ofType(PostActions.deletePost),
    mergeMap(action => this.postService.deletePost(action.id)
      .pipe(
        map(() => PostActions.deletePostSuccess({ id: action.id })),
        catchError(error => of(PostActions.deletePostFailure({ error })))
      )
    )
  ));

}
