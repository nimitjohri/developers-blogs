import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../article';
import { PostsService } from '../posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../models/comment';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  commentForm: FormGroup;
  article: Article;
  slug: string;
  comments: Array<Comment>;
  currentUser: any;
  isLoggedIn: Observable<boolean>;
  isFollowed: boolean;

  constructor(private activatedRoute: ActivatedRoute, private articleService: PostsService,
    private formbuilder: FormBuilder, private commentsService: CommentsService,
    private router: Router, private userService: UserService, private authService: AuthenticationService) {
      this.isLoggedIn = authService.isLoggedIn();
      this.isFollowed = false;
     }

  ngOnInit() {
    this.commentForm = this.formbuilder.group({
      comment: ['', Validators.required]
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.slug = params['slug'];
    });
    this.articleService.getArticleBySlug(this.slug)
      .subscribe((data: any) => { this.article = data.article,
        this.userService.getProfile(this.article.author.username)
        .subscribe((profile: any) => {
        this.isFollowed = profile.profile.following;
        console.log(this.isFollowed);
        });
      });

    this.commentsService.getComments(this.slug)
      .subscribe((data: any) => { this.comments = data.comments; });
      this.userService.getUserByToken()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.currentUser = data.user;
        }
      );

      // this.userService.getProfile(this.article.author.username)
      // .subscribe((data: any) => {
      //   console.log('hiiiiii' + JSON.stringify(data));
      //   this.isFolowed = data.profile.following;
      // });
  }

  get f() {
    return this.commentForm.controls;
  }

  onSubmit() {
    this.commentsService.addComment(this.f.comment.value, this.slug)
      .pipe(first())
      .subscribe(
        (data) => {
          window.location.reload();
        }
      );
  }

  canModifyComment(username?: string): boolean {
    if (username === this.currentUser.username) {
      return true;
    }
      return false;
  }

  deleteComment(id: number, username?: string) {
    this.commentsService.deleteComment(this.slug, id)
      .pipe(first())
      .subscribe(
        data => {
          window.location.reload();
        }
      );
  }

  followUser(username?: string) {
    this.userService.followUser(username)
    .pipe(first())
      .subscribe(
        data => {
          console.log('done');
          window.location.reload();
        },
      );
  }

  deleteArticle(slug: string) {
    this.articleService.deleteArticle(slug)
    .subscribe(
      (data) => {
        this.router.navigateByUrl('/');
      });
  }

  unFollowUser(username?: string) {
    this.userService.unFollowuser(username)
    .pipe(first())
      .subscribe(
        data => {
          console.log('done');
          window.location.reload();
        },
      );
  }
}
