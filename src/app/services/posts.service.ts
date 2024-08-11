
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Post } from '../interfaces/post.model';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient, private cacheService: CacheService) { }


  getPosts(): Observable<Post[]> {
    const cachedPosts = this.cacheService.get('posts');
    if (cachedPosts) {
      return of(cachedPosts);
    } else {
      return this.http.get<Post[]>(this.apiUrl).pipe(
        tap(posts => this.cacheService.set('posts', posts)),
        catchError(() => of([]))  // Fallback in case of error
      );
    }
  }

  getPostsDetails(id: number): Observable<Post[]> {
    const cachedPosts = this.cacheService.get('posts');
    if (cachedPosts) {
      return of(cachedPosts);
    } else {
      return this.http.get<Post[]>(`${this.apiUrl}/${id}`).pipe(
        tap(posts => this.cacheService.set('posts', posts)),
        catchError(() => of([]))  // Fallback in case of error
      );
    }
  }

  addPost(post: Post): Observable<Post> {
    this.cacheService.clear('posts');
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(post: Post): Observable<Post> {
    this.cacheService.clear('posts');
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post);
  }

  deletePost(id: number): Observable<void> {
    this.cacheService.clear('posts'); // Invalidate cache
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
