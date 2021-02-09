import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../_models/comment';
import { Injectable } from '@angular/core';
import { Blog } from '../_models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'https://iti-blogz.herokuapp.com/blogs';

  httpOptions = function () {
    return {
      headers: new HttpHeaders({
        token: localStorage.getItem('token')!
      })
    }
  };

  getAll(page: number, count: number) {
    return this.http.get<Blog[]>(`${this.apiUrl}`, {
      params: {
        page: `${page}`,
        count: `${count}`
      }
    });
  }

  getFollowing(page: number, count: number) {
    return this.http.get<Blog[]>(`${this.apiUrl}/following`, {
      ...this.httpOptions(),
      params: {
        page: `${page}`,
        count: `${count}`
      }
    });
  }

  search(query: any, page: number, count: number) {
    return this.http.get<Blog[]>(`${this.apiUrl}/search`, {
      ...this.httpOptions(),
      params: { ...query, page, count }
    });
  }

  add(blog: Blog) {
    return this.http.post<Blog>(`${this.apiUrl}`, blog, this.httpOptions());
  }

  edit(blogId: string, blog: Blog) {
    return this.http.patch<Blog>(`${this.apiUrl}/${blogId}`, blog, this.httpOptions());
  }

  like(blogId: string) {
    return this.http.patch<Blog>(`${this.apiUrl}/like/${blogId}`, {}, this.httpOptions());
  }

  unlike(blogId: string) {
    return this.http.patch<Blog>(`${this.apiUrl}/unlike/${blogId}`, {}, this.httpOptions());
  }

  comment(blogId: string, content: Comment) {
    return this.http.patch<Blog>(`${this.apiUrl}/comment/${blogId}`, content, this.httpOptions());
  }

  uncomment(blogId: string, commentId: string) {
    return this.http.patch<Blog>(`${this.apiUrl}/uncomment/${blogId}`, { commentId }, this.httpOptions());
  }

  delete(blogId: string) {
    return this.http.delete<Blog>(`${this.apiUrl}/${blogId}`, this.httpOptions());
  }
}
