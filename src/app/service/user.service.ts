import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://usr2.uneekli.com';
  keywords= [];
  

  constructor(private httpClient: HttpClient) {
    
  }

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

  customerDetails(email: string) {
    const apiurl = this.apiUrl + '/user/' + email;
    return this.httpClient.get<User>(apiurl);
  }

  getKeywords(key: string, lang: string, country: string){
    const url = 'http://localhost:3000' + `/keys/${key}/${lang}/${country}`;
    return this.httpClient.get(url);
  }
}

export interface User {
  email: string;
  password: string;
}
