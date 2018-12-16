// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiHost: '',
  appName: '19BIT',
  appHost: 'http://localhost:4200',
  appIcon: `${this.appHost}/assets/login.jpg`,
  appSecret: '19bitsecret',
  firebase: {
    apiKey: 'AIzaSyBO5g3TgjXc6n9bcP0G9z4VSE98tW7y8bo',
    authDomain: 'fcc-book-trading-173021.firebaseapp.com',
    databaseURL: 'https://fcc-book-trading-173021.firebaseio.com',
    projectId: 'fcc-book-trading-173021',
    storageBucket: 'fcc-book-trading-173021.appspot.com',
    messagingSenderId: '763399536402'
  }
};
