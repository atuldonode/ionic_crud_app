import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.model';
import { AppState } from '../stateManagement/app.state';
import { deletePost, loadPosts } from '../stateManagement/posts/posts.actions';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { selectUser } from '../stateManagement/auth/auth.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts$: Observable<Post[]>;
  user$: Observable<any>;

  constructor(
    private store: Store<AppState>, 
    private router: Router,
    private auth : AuthService
  ) {
    this.user$ = this.store.select(selectUser);
    this.posts$ = this.store.select(state => state.posts?.posts);
  }

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }

  onAddPost() {
    this.router.navigate(['/tabs/post/add']);
  }
  
  onUpdatePost(post: Post) {
    this.router.navigate(['/tabs/post/edit', post.id]);
  }
  
  onDeletePost(id: number) {
    this.store.dispatch(deletePost({ id }));
  }
  
  signOut() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
} 
