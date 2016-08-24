import { Component } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'moviegoer',
  template: `
    <h3>Update information</h3>
    <input type="text" #newname placeholder="Name" />
    <input type="text" #age placeholder="Size" />
    <button (click)="save(newname.value, age.value)">Update your information</button>

    <h3>Movie goer</h3>
    <p>
    {{ (moviegoer | async)?.name }}
    {{ (moviegoer | async)?.age }}

    </p>
  `,
  styleUrls: ['theater.component.css']
})
export class MovieGoer {
    moviegoer;

    constructor( public af:AngularFire ) {
      this.moviegoer = af.database.object('/user');
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
}