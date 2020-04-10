import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { Comment } from '../Comment';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {

  private querySub: any;
  //@Input() post: BlogPost;
  post: BlogPost;
  commentName: string;
  commentText: string;

  constructor(private data: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params => {
      //TODO: Get post by Id params['id'] and store the result in this.post
      this.data.getPostbyId(params['id']).subscribe(data => {
        this.post = data;
        ++this.post.views;
      });
    });
    this.data.updatePostById(this.post._id, this.post).subscribe();
  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }

  // Assignment 6
  submitComment() {

    var temp = new Comment();
    temp.author = this.commentName;
    temp.comment = this.commentText;
    temp.date = new Date().toLocaleDateString();

    this.post.comments.push(temp);
    this.data.updatePostById(this.post._id, this.post).subscribe(data => {
      this.commentName = null;
      this.commentText = null;
    })
  }
}
