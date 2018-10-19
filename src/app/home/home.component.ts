import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  constructor() {
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
