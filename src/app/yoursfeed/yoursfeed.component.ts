import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Article } from '../article';

@Component({
  selector: 'app-yoursfeed',
  templateUrl: './yoursfeed.component.html',
  styleUrls: ['./yoursfeed.component.css']
})
export class YoursfeedComponent implements OnInit {

  articles: any;
  constructor(private articleService: PostsService) {
    this.articles = [];
   }

  ngOnInit() {
    this.articleService.getFeed()
    .subscribe((data: any) => this.articles = (Object.values(data)));
  }

}
