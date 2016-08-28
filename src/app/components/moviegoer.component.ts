import { Component } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'moviegoer',
  templateUrl: 'moviegoer.component.html'
})
export class MovieGoer {
    moviegoer;
    movie;

  constructor( public af:AngularFire ) {
      this.moviegoer = af.database.object('/user');
      this.initMovie();
  }

  save(name,age) {
    this.create('user', {
      name : name,
      age: age
    });
  }

  create(key, value){
    this.af.database.object(`/${key}`).set(value); // replace the whole object
  }

  update(key,value){
    this.af.database.object(`/${key}`).update(value); // { address : 'London' }
  }

  remove(key){
    this.af.database.object(`/${key}`).remove();
  }

  get( key ) {
    return this.af.database.object(`/${key}`);
  }

  private initMovie(){
    this.remove('selected-movie');
    this.create('selected-movie', {
      name : 'Jason Bourne',
      length : 146
    });
    this.movie = this.get( 'selected-movie' );

  }
}
