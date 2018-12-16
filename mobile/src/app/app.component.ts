import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  firebase: {
    apiKey: 'AIzaSyBO5g3TgjXc6n9bcP0G9z4VSE98tW7y8bo',
    authDomain: 'fcc-book-trading-173021.firebaseapp.com',
    databaseURL: 'https://fcc-book-trading-173021.firebaseio.com',
    projectId: 'fcc-book-trading-173021',
    storageBucket: 'fcc-book-trading-173021.appspot.com',
    messagingSenderId: '763399536402'
  }
}

