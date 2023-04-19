import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://user-service-production-66f8.up.railway.app';

  constructor(private httpClient: HttpClient) {}

  loginUser(apiUrl: string, userData: User) {
    return this.httpClient
      .post(this.apiUrl + apiUrl, userData, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          const token = response.headers.get('Authorization') || '';
          localStorage.setItem('Authorization', `Bearer ${token}`);
          return response.body;
        })
      );
  }
}

export interface User {
  email: string;
  password: string;
}
