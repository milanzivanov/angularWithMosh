import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  // posts: RootObject;
  posts: any;
  urlLimit = '?_limit=10';
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
    http.get(`${this.url}${this.urlLimit}`)
        .subscribe(
          response => {
          console.log(response);
          this.posts = response;
          // this.posts = {
          //   userId: this.posts.userId,
          //   id: this.posts.id,
          //   title: this.posts.title,
          //   body: this.posts.body,
          // };
        });
  }

  ngOnInit() {
  }


  createPost(input: HTMLInputElement) {
    let post: any = {
      title: input.value
    };
    input.value = '';
    this.http.post(this.url, post)
      .subscribe(response => {
        post.id = response;
        // post['id'] = response;
        this.posts.splice(0, 0, post);
        console.log(response);
      });
  }

}

// interface RootObject {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }
