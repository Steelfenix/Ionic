// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environmentDev = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCcyJ2qjCXj-9e9v5H_GmXDwueCrh0nc1Y',
    authDomain: 'cdis-curso.firebaseapp.com',
    databaseURL: 'https://cdis-curso.firebaseio.com',
    projectId: 'cdis-curso',
    storageBucket: 'cdis-curso.appspot.com',
    messagingSenderId: '987891964183'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
