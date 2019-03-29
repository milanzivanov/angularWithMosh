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

    this.service.getPosts()
    .subscribe(
      response => {
        // casting response to model interface
        this.posts = <ITemplate>response;
        // this.posts = response as ITemplate;
      },
      error => {
        alert('An unexpected error occuerd');
        console.log(error);
      }
    );
  }

    createPost(input: HTMLInputElement) {
      let post: any = {
          title: input.value
      };
    input.value = '';
      this.service.createPost(post)
      .subscribe(
        response => {
          post.id = response;
          // post['id'] = response;
          this.posts.splice(0, 0, post);
          console.log(response);
        },
        (error: AppError) => {
          if (error instanceof BadInput) {
            // if we had forms
            // this.form.setErrors(error.json());
            // this.form.setErrors(error.originalError);
          } else {
            alert('An unexpected error occuerd');
            console.log(error);
          }
        }
      );
    }

  updatePost(post: ITemplate) {
    // this.http.put(this.url, JSON.stringify(post))
    // this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
    this.service.updatePost(post)
      .subscribe(
        response => {
          console.log('response:', response);
        },
        error => {
          alert('An unexpected error occuerd');
         console.log(error);
        }
      );
    }

  delitePost(post: ITemplate) {
    this.service.delitePost(post)
    .subscribe(
      response => {
        let index = this.posts.indexOf(post);
        console.log('index:', index)
        this.posts.splice(index, 1);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError)
          alert('This post has already delited.');
        else {
          alert('An unexpected error occuerd');
          console.log(error);
        }
      }
    );
  }

}


