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
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent  implements OnInit {

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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = +params['id'];
      if (this.postId) {
        this.store.dispatch(loadPost({ id: this.postId }));
        this.post$ = this.store.pipe(select(state => state.posts.selectedPost));
        this.post$.subscribe(post => {
          if (post) {
            if (Array.isArray(post)) {
              const data = post.find(p => p.id === this.postId);
              this.postForm.patchValue(data || {});
            } else {
              this.postForm.patchValue(post);
            }
          }
        });
      }
    });
  }

  onSavePost() {
    if (this.postForm.valid) {
      const post: Post = {
        ...this.postForm.value,
        id: this.postId ? 1 : undefined
      };
        this.store.dispatch(updatePost({ post }));
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
