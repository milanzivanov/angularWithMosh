import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ITemplate } from './../template';
// import { Observable } from 'rxjs';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: ITemplate;

  urlLimit = '?_limit=10';
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

    this.http.get(`${this.url}${this.urlLimit}`)
    .subscribe(
      response => {
        // casting response to model interface
        this.posts = <ITemplate>response;
        // this.posts = response as Template;
      });

    }

  //   createPost(input: HTMLInputElement) {
  //     let post: any = {
  //         title: input.value
  //     };
  //   input.value = '';
  //   this.http.post(this.url, post)
  //     .subscribe(response => {
  //       post.id = response as Template;
  //       // post['id'] = response;
  //       this.posts.slice(0, 0, post);
  //       console.log(response);
  //     });
  // }

}


