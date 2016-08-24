// CORE DEPS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule, AuthMethods } from 'angularfire2';

// MATERIAL DESIGN MODULES
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';

export let MD_MODULES: any = [
  MdToolbarModule,
  MdButtonModule,
  MdCardModule
];

// APP
import { AppComponent }  from './app.component';
import { Theater } from './components/theater.component';

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
    BrowserModule,
    ...MD_MODULES
  ],
  declarations: [
    AppComponent,
    Theater

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
