import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post.model';
import { AppState } from 'src/app/stateManagement/app.state';
import { addPost, loadPost, updatePost } from 'src/app/stateManagement/posts/posts.actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage {

  postForm: FormGroup;
  post$!: Observable<Post[] | null>;
  state: any = this.location.getState();
  postId: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  // Save function
  onSavePost() {
    if (this.postForm.valid) {
      const post: Post = {
        ...this.postForm.value,
        id: this.postId ? 1 : undefined
      };
      this.store.dispatch(addPost({ post }));
      this.clearForm();
      this.goBack();
    }
  }

  clearForm() {
    this.postForm.reset();
  }

  goBack() {
    this.router.navigate(['/tabs/home']);
  }

}
