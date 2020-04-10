import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { NgForm } from "@angular/forms"
import { PostService } from '../post.service';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost;
  tags: String;


  constructor(private data: PostService, private router: Router, private route: ActivatedRoute) { }

  //onSubmit(f: NgForm): void { }

  ngOnInit(): void {

    let id = this.route.snapshot.params['id'];
    this.data.getPostbyId(id).subscribe(data => {
      this.blogPost = data;
      this.tags = this.blogPost.tags.toString();
      //console.log(this.tags);
    });

  }

  formSubmit(): void {

    // convert the string to an array and remove whitespace
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());

    this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe(data => {
      this.blogPost = data;
    })
    this.router.navigate(['admin']);
  }

  deletePost(): void {

    this.data.deletePostById(this.blogPost._id).subscribe();
    this.router.navigate(['admin']);
  }

}
