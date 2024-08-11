import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsPage } from './posts.page';
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsPage
  },
  {
    path: 'add',
    component: PostsPage
  },
  {
    path: 'edit/:id',
    component: EditPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsPageRoutingModule {}
