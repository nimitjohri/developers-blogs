import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url = 'https://conduit.productionready.io/api/';

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get(`${this.url}articles`);
  }

  getArticleBySlug(slug: string) {
    return this.http.get(`${this.url}articles/${slug}`);
  }

  addArticle(title: string, description: string, content: string, tags?: string) {
    // tslint:disable-next-line:quotemark
    const headers = new HttpHeaders ({ "Content-Type": "application/json", "Authorization": "Token " +
  localStorage.jwtToken});
    return this.http.post<any>(`${this.url}articles`,
    // tslint:disable-next-line:quotemark
    {"article": {title: title, description: description, body: content, tagList: tags}}, {
    headers: headers
    })
    .pipe(map (article => {
    return article.article;
    }));
  }
}
