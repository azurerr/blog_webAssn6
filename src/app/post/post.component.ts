import blogData from '../blogData.json';
import { BlogPost } from '../BlogPost';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  blogPosts: Array<BlogPost> = blogData;

  constructor() { }

  ngOnInit(): void {

  }

}
