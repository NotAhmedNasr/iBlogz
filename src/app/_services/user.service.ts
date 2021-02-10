import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'https://iti-blogz.herokuapp.com/users';

  httpOptions = function () {
    return {
      headers: new HttpHeaders({
        token: localStorage.getItem('token')!
      })
    }
  };

  getAll(page: number, count: number) {
    return this.http.get<User[]>(`${this.apiUrl}`, {
      ...this.httpOptions,
      params: {
        page: `${page}`,
        count: `${count}`
      }
    });
  }

  getById(id: string) {
    return this.http.get<User>(`${this.apiUrl}/${id}`, this.httpOptions());
  }

  getByUsername(username: string) {
    return this.http.get<User>(`${this.apiUrl}/byname/${username}`, this.httpOptions());
  }

  addUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}`, user);
  }

  login(user: User) {
    return this.http.post<User>(`${this.apiUrl}/login`, user);
  }

  follow(id: string) {
    return this.http.patch<User>(`${this.apiUrl}/follow/${id}`, {}, this.httpOptions());
  }

  unfollow(id: string) {
    return this.http.patch<User>(`${this.apiUrl}/unfollow/${id}`, {}, this.httpOptions());
  }

  edit(user: User) {
    return this.http.patch<User>(`${this.apiUrl}/`, user, this.httpOptions());
  }

  delete() {
    return this.http.delete<User>(`${this.apiUrl}/`, this.httpOptions());
  }

  setProfilePicture(image: string) {
    return this.http.patch<User>(`${this.apiUrl}/`, { profilePicture: image }, this.httpOptions());
  }
}
