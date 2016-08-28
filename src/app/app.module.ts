// CORE DEPS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule, AuthMethods } from 'angularfire2';

// APP
import { AppComponent }  from './app.component';
import { Theater } from './components/theater.component';
import { MovieGoer } from './components/moviegoer.component';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdIconModule } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdMenuModule } from '@angular2-material/menu';
import { MdTabsModule } from '@angular2-material/tabs';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdTooltipModule } from '@angular2-material/tooltip';

var config = {
    apiKey: "AIzaSyCE9PCH6nwsfT51O4PAMESQvdduDxzkJCM",
    authDomain: "london-js.firebaseapp.com",
    databaseURL: "https://london-js.firebaseio.com",
    storageBucket: "",
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
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule
  ],
  declarations: [
    AppComponent,
    Theater,
    MovieGoer

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
