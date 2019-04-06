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
export class DataService {

  urlLimit = '?_limit=10';

  constructor(
    private url: string,
    private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.url}${this.urlLimit}`)
      .pipe(
        catchError(catchError(this.handleError))
      );
  }

  create(resource: ITemplate) {
    // failed scenario
    // return Observable.throw(new AppError);

    return this.http.post(this.url, resource)
      .pipe(
        catchError(catchError(this.handleError))
      );
  }

  update(resource: ITemplate) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true}))    .pipe(
      catchError(this.handleError));
  }

  delite(post: ITemplate) {
    // failed scenario
    // return Observable.throw(new AppError);

    return this.http.delete(this.url + '/' + post.id)
    .pipe(
      catchError(this.handleError));
  };


  private handleError(error: Response) {

    if (error.status === 400)
      return Observable.throw(new BadInput(error));

    if (error.status === 404)
      return Observable.throw(new NotFoundError());

    return Observable.throw(new AppError(error));
  }
}

