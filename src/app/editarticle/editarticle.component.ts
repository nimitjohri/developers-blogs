import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Article } from '../article';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editarticle',
  templateUrl: './editarticle.component.html',
  styleUrls: ['./editarticle.component.css']
})
export class EditarticleComponent implements OnInit {

  article: Article;
  slug: string;
  articleForm: FormGroup;
  constructor(private articleService: PostsService, private activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.articleForm = this.formbuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['']
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.slug = params['slug'];
    });

    this.articleService.getArticleBySlug(this.slug)
    .subscribe((data: any) => {
      this.article = data.article;
      console.log(this.article);
    });
  }

  get f() {
    console.log('mein chal raha hu');
    return this.articleForm.controls; }

    onSubmit() {
      // if (this.articleForm.invalid) {
      //   return;
      // }
      this.articleService.updateArticleBySlug(this.slug, this.f.title.value, this.f.description.value,
        this.f.content.value, this.f.tags.value)
        .pipe(first())
        .subscribe(
          data => {
            console.log('done');
            this.router.navigateByUrl('/');
          },
        );
    }

}
