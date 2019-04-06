import { BadInput } from './../bad-input';
import { AppError } from './../app-error';
import { Component, OnInit } from '@angular/core';
import { ITemplate } from './../template';
import { PostService } from '../services/post.service';
import { NotFoundError } from '../not-found-error';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: ITemplate;

  constructor(private service: PostService) {
  }

  ngOnInit() {

    this.service.getAll()
    .subscribe(
      response => {
        // casting response to model interface
        this.posts = <ITemplate>response;
        // this.posts = response as ITemplate;
      });
  }

    createPost(input: HTMLInputElement) {
      let post: any = {
          title: input.value
      };
      this.posts.splice(0, 0, post);

      input.value = '';

      this.service.create(post)
      .subscribe(
        response => {
          post.id = response;
          // post['id'] = response;
          console.log(response);
        },
        (error: AppError) => {
          this.posts.splice(0, 1);

          if (error instanceof BadInput) {
            // if we had forms
            // this.form.setErrors(error.json());
            // this.form.setErrors(error.originalError);
          }
          else throw error;
        }
      );
    }

  updatePost(post: ITemplate) {
    // this.http.put(this.url, JSON.stringify(post))
    // this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
    this.service.update(post)
      .subscribe(
        response => {
          console.log('response:', response);
        });
    }

  delitePost(post: ITemplate) {
    let index = this.posts.indexOf(post);
    console.log('index:', index)
    this.posts.splice(index, 1);

    this.service.delite(post)
    .subscribe(
      null,
      (error: AppError) => {
        this.posts.splice(index, 0, post);

        if (error instanceof NotFoundError)
          alert('This post has already delited.');
        else throw error
      }
    );
  }

}


