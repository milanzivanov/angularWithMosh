import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITemplate } from '../template';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  urlLimit = '?_limit=10';
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(`${this.url}${this.urlLimit}`);
  }

  createPost(post: ITemplate) {
    return this.http.post(this.url, post);
  }

  updatePost(post: ITemplate) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}));
  }

  delitePost(post: ITemplate) {
    return this.http.delete(this.url + '/' + post.id)
  }

}
