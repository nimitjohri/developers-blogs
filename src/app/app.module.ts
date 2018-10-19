import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AlertService } from './alert.service';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { CommentsService } from './services/comments.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { JwtInterceptor } from './jwt.interceptors';
import { GlobalfeedComponent } from './globalfeed/globalfeed.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { NewarticleComponent } from './newarticle/newarticle.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent /*, canActivate: [AuthGuard]*/ },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'globalfeed', component: GlobalfeedComponent},
  {path: 'articledetails', component: ArticleDetailsComponent, canActivate: [AuthGuard]},
  { path: 'articledetails/:slug', component: ArticleDetailsComponent, canActivate: [AuthGuard]},
  { path: 'newarticle', component: NewarticleComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    GlobalfeedComponent,
    ArticleDetailsComponent,
    NewarticleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService,
    AuthGuard,
    CommentsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
