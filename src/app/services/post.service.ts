import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data-service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService {

  urlLimit = '?_limit=10';

  constructor(
    http: HttpClient) {
      super('http://jsonplaceholder.typicode.com/posts', http);
  }


}

