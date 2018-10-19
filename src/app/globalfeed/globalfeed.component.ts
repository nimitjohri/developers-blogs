import { Component, OnInit } from '@angular/core';
import { PostsService} from '../posts.service';

@Component({
  selector: 'app-globalfeed',
  templateUrl: './globalfeed.component.html',
  styleUrls: ['./globalfeed.component.css']
})
export class GlobalfeedComponent implements OnInit {

  posts: any;
  constructor(private getPost: PostsService) {
    this.posts = [];
  }

  ngOnInit() {
    this.getPost.getArticles()
    .subscribe((data: any) => this.posts = (Object.values(data)));
    console.log('hiii');
  }
}
