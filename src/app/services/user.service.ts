import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //===============================< properites >===================================================
  userurl: string = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) {}
  // ==============================< get all users >================================================
  getAllUsers(page: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.userurl}?page=${page}`);
  }
  //===============================< get user by id >===============================================
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userurl}/${id}`);
  }
}
