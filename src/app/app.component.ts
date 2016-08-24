import { Component } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';

import { Theater } from './components/theater.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  isAuth = false;
  authColor = 'warn';
  user = {};
  test;


  constructor(
    public af: AngularFire
  ) {
  
    this.test = af.database.object('/user');
    //this.test.set( { name : 'pelle' } );

    //data.subscribe( data => {
    //  console.log( data );
    //}, err => {
    //  console.log(err);
    //})

    this.af.auth.subscribe(
      user => this._changeState(user),
      error => console.trace(error)
    );
 
  }

  create(key, value){
    this.af.database.object(`/${key}`).set(value); // replace the whole object
  }

  update(key,value){
    this.af.database.object(`/${key}`).update(value); // { address : 'London' }
  }

  login(from: string) {
    this.af.auth.login({
      provider: this._getProvider(from)
    });
  }
  logout() {
    this.af.auth.logout();
  }

  private _changeState(user: any = null) {
    if(user) {
      this.isAuth = true;
      this.authColor = 'primary';
      this.user = this._getUserInfo(user)
    }
    else {
      this.isAuth = false;
      this.authColor = 'warn';
      this.user = {};
    }
  }

  private _getUserInfo(user: any): any {
    if(!user) {
      return {};
    }
    let data = user.auth.providerData[0];
    return {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId
    };
  }

  private _getProvider(from: string) {
    switch(from){
      case 'twitter': return AuthProviders.Twitter;
      case 'facebook': return AuthProviders.Facebook;
      case 'github': return AuthProviders.Github;
      case 'google': return AuthProviders.Google;
    }
  }
}


