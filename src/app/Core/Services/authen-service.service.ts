import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Models/user';
import { Configuration } from '../Config/configuration';

@Injectable({
  providedIn: 'root'
})
export class AuthenServiceService {


  private currentUser = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) { }

  // login
  // gửi repost requst tới API service

  login(username: string, password: string) {
    return this.http.post<User>(Configuration.PREFIX_URL + '/LogIn/authenticate'
      , { username, password })
      .subscribe(
        (res) => {
          debugger;
          //khi api trả về dữ liệu về 200, và dữ liệu trả về là hợp lệ
          if (res && res.token) {
            localStorage.setItem(Configuration.LOGINED_USER_KEY, JSON.stringify(res));
            this.currentUser.next(res);
          }
        }
        ,
        (err) => {
          console.log(err.message);
        }
      );
  }

  get CurrentUser() {
    return this.currentUser.asObservable();
  }

  get isLogin() {
    if (this.currentUser.value) {
      return true;
    } else {
      const lastUser: User = JSON.parse(localStorage.getItem(Configuration.LOGINED_USER_KEY));
      if (lastUser && lastUser.token) {
        this.currentUser.next(lastUser);
        return true;
      }
    }
    return false;
  }


  LogOut() {
    localStorage.removeItem(Configuration.LOGINED_USER_KEY);
    return this.currentUser.next(null);
  }

  test() {
    return this.http.get<any>(Configuration.PREFIX_URL + '/LogIn');
  }
}

