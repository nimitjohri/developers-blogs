import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  isLoggedIn: Observable<boolean>;
  constructor(
    private authService: AuthenticationService) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  activeTab = 'globalfeed';

  globalfeed(activeTab) {
    console.log('globval');
    this.activeTab = activeTab;
  }

  yourfeed(activeTab) {
    console.log('your');
    this.activeTab = activeTab;
  }
}
