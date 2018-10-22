import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})

export class UserService {
    // tslint:disable-next-line:quotemark

  httpHeaders = new HttpHeaders();
  url: 'https://conduit.productionready.io/api/';
  constructor(private http: HttpClient) { }

  getById(id: number) {
    return this.http.get(`${this.url}user/` + id);
}

register(user: User) {
    return this.http.post(`${this.url}users`, user);
}

getUserByToken() {
  // tslint:disable-next-line:quotemark
  const headers = new HttpHeaders ({ "Content-Type": "application/json", "Authorization": "Token " +
  localStorage.jwtToken});
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET,POST,DELETE');
        headers.append('Access-Control-Allow-Origin', '*');
  return this.http.get(`https://conduit.productionready.io/api/user`, {headers: headers});
}

followUser(username?: string) {
  const headers = new HttpHeaders ({ 'Content-Type': 'application/json', 'Authorization': 'Token ' +
  localStorage.jwtToken});
  return this.http.post(`https://conduit.productionready.io/api/profiles/${username}/follow`, null,
  {headers: this.httpHeaders});
}

unFollowuser(username?: string) {
  const headers = new HttpHeaders ({ 'Content-Type': 'application/json', 'Authorization': 'Token ' +
  localStorage.jwtToken});
  return this.http.delete(`https://conduit.productionready.io/api/profiles/${username}/follow`,
  {headers: this.httpHeaders});
}

getProfile(username: string) {
  // tslint:disable-next-line:quotemark
  const headers = new HttpHeaders ({ 'Content-Type': 'application/json', 'Authorization': 'Token ' +
  localStorage.jwtToken});
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET,POST,DELETE');
        headers.append('Access-Control-Allow-Origin', '*');
  this.httpHeaders = headers;
  console.log(this.httpHeaders);
  return this.http.get(`https://conduit.productionready.io/api/profiles/${username}`,
  {headers: headers});
}



}
