import { Component, OnInit } from '@angular/core';
import { PostsService} from '../posts.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-globalfeed',
  templateUrl: './globalfeed.component.html',
  styleUrls: ['./globalfeed.component.css']
})
export class GlobalfeedComponent implements OnInit {

  posts: any;
  tags: any;
  // tag: string;
  constructor(private articleService: PostsService, private activatedRoute: ActivatedRoute) {
    this.posts = [];
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params.values);
      console.log(this.tag);
      // if ( params.values === undefined) {
      //   this.tag = null;
      // } else {
      // this.tag = params['tag'];
      // }
    });
  }

  ngOnInit() {
    // if (this.tag === undefined) {
      console.log('if');
     this.articleService.getArticles()
    .subscribe((data: any) => {this.posts = (Object.values(data)), console.log(this.tag);
    });
    // } else {
    //   console.log('elset' + this.tag);
    //   this.articleService.getArticlesByTag(this.tag)
    //   .subscribe((data: any) => {this.posts = (Object.values(data)), console.log(JSON.stringify(data));
    //   });
    // }

    this.articleService.getArticles()
    .subscribe((data: any) => this.posts = (Object.values(data)));

    this.articleService.getTags()
    .subscribe((data: any) => {this.tags = data.tags, console.log(this.tags); });
  }

  // getTag(tag: string) {
  //   window.location.reload();
  //   this.tag = tag;
  // }

  favoriteArticle(slug: string) {
    this.articleService.favoriteArticle(slug)
    .subscribe(
      data => {
        console.log('favorite added');
      }
    );
  }
}
