// CORE DEPS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule, AuthMethods } from 'angularfire2';

// APP
import { AppComponent }  from './app.component';
import { Theater } from './components/theater.component';
import { MovieGoer } from './components/moviegoer.component';

/*
var waseem = {
        apiKey: "AIzaSyCk3weREVFpOIN6pL_QVVNFRl3C3keMIRU",
        authDomain: "angular2-auth.firebaseapp.com",
        databaseURL: "https://angular2-auth.firebaseio.com",
        storageBucket: "angular2-auth.appspot.com"
}*/

var config = {
  apiKey: "AIzaSyAD44gPRzYXU3-NI0jmUpk78MQAj-P6zwM",
  authDomain: "fir-workshop-fb35a.firebaseapp.com",
  databaseURL: "https://fir-workshop-fb35a.firebaseio.com",
  storageBucket: "fir-workshop-fb35a.appspot.com",
};

@NgModule({
  imports: [
    AngularFireModule.initializeApp(
      config,
      {
        //method: AuthMethods.Popup,
        method: AuthMethods.Redirect
      }
    ),
    BrowserModule
  ],
  declarations: [
    AppComponent,
    Theater,
    MovieGoer

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
