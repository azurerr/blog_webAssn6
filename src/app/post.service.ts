import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from './BlogPost';
import { Observable } from 'rxjs';

const perPage = 6;
const MaxNum = Number.MAX_SAFE_INTEGER;

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(page, tag, category): Observable<BlogPost[]> {

    let params = {
      page: page,
      perPage: perPage.toString()
    }

    if (tag != null) {
      params["tag"] = tag;
    }
    if (category != null) {
      params["category"] = category;
    }

    return this.http.get<BlogPost[]>(`https://jlee592-web422-assi05.herokuapp.com/api/posts`, { params });
  }

  getPostbyId(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://jlee592-web422-assi05.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`https://jlee592-web422-assi05.herokuapp.com/api/categories`);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`https://jlee592-web422-assi05.herokuapp.com/api/tags`);
  }


  /// Assignment 6 **************************

  getAllPosts(): Observable<BlogPost[]> {

    //The Number.MAX_SAFE_INTEGER constant represents the maximum safe integer in JavaScript (253 - 1)
    return this.http.get<BlogPost[]>(`https://jlee592-web422-assi05.herokuapp.com/api/posts?page=1&perPage=${MaxNum}`);
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`https://jlee592-web422-assi05.herokuapp.com/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://jlee592-web422-assi05.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`https://jlee592-web422-assi05.herokuapp.com/api/posts/${id}`)
  }

}
