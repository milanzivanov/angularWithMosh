import { BadInput } from './../bad-input';
import { AppError } from './../app-error';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITemplate } from '../template';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotFoundError } from '../not-found-error';

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
    return this.http.post(this.url, post)
      .pipe(
        catchError((error: Response) => {
          if (error.status === 400)
            return Observable.throw(new BadInput(error));

          return Observable.throw(new AppError(error));
        })
      )
  }

  updatePost(post: ITemplate) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}));
  }

  delitePost(post: ITemplate) {
    return this.http.delete(this.url + '/' + post.id)
    .pipe(
      catchError((error: Response) => {
        if (error.status === 404)
          return Observable.throw(new NotFoundError());

        return Observable.throw(new AppError(error));
      })
    )
  };
}

