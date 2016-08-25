import { Component } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'moviegoer',
  template: `
    <div class="moviegoer">
      <h3>Update information</h3>
      <div class="moviegoer-input">
        <input type="text" #newname placeholder="Name" />
        <input type="text" #age placeholder="Age" />
        <button (click)="save(newname.value, age.value)">Update your information</button>
      </div> 
      
      <h3>Selected movie</h3>
      <p class="movie-detail">
      Title : {{ (movie | async )?.name }}
      </p>
      <p class="movie-detail-length">
      Movie length: {{ (movie | async )?.length }} min.
      </p>

      <h3>Customer</h3>
      <p class="moviegoer-info">
      {{ (moviegoer | async)?.name }}
      {{ (moviegoer | async)?.age }}

      </p>
    </div>
  `,
  styleUrls: ['moviegoer.component.css']
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