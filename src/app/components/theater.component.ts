import { Component } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'theater',
  template: `
    <h2>Movie theater</h2>
    <h3>Listing the seats</h3>

    <div> Plats {{ ( plats | async )?.name }} {{ ( plats | async )?.country }} </div>
    <div style="clear:both"></div>

    <div class="movies" [ngClass]="{ animate: animate }">
        <div *ngFor="let seat of list | async" class="row" [ngClass]="{ animate : animate }">
            <div [title]="seat.description" (click)="book(seat)" [ngClass]="{ booked: seat.booked, reserved : seat.reserved }" class="column">
            <span class="seat">{{ seat.seat }}</span>
            </div>
        </div>
        <div class="selected-seat">Latest selection : {{ selectedSeat?.description }}</div>
    </div>
  `,
  styleUrls: ['theater.component.css']
})
export class Theater{
    rows:Array<Row>;
    selectedSeat:Column;
    animate:boolean;
    list;
    plats;

    constructor(public af:AngularFire){
        this.rows = new Array<Row>();

        setTimeout(() => {
            this.animate = true;
        },100);  

        //for(var i=0; i< 10; i++) {
        //    this.rows.push( new Row(i + 1) );
        //}

        this.plats = af.database.object('/plats');
        //this.plats.set({name : 'Bristol'});
        this.plats.update({ country : 'UK' });

        this.initSeats();
    }

    private initSeats(){
        this.list = this.af.database.list('/seats');
       // this.list.remove();


        for(var i=0; i< 100; i++) {
            this.list.push({ seat: i + 1, reserved : false, booked : false });
        }
    }

    book(seat) {

       
        var db = this.af.database.list('/seats');
    
        this.selectedSeat = seat;
      
        if(seat.booked) {
            seat.booked = false;
            seat.reserved;
        } else if(seat.reserved) {
            seat.booked = true;
            seat.reserved = false;
        } else if(seat.booked) {
            seat.booked = false;
        } else {
            seat.reserved = true;
        }

        db.update(seat.$key, {
            booked : seat.booked,
            reserved : seat.reserved
        }).then(() => {
           // show spinner 
        }, err => console.log(err) );
        
    }
}

class Row {
  columns:Array<Column>;
  animate:boolean;
  constructor(row:number){
    this.columns = new Array<Column>();
    for(var i=0; i< 10; i++) {
      this.columns.push( new Column( row + "-" + (i+ 1) ) );
    }

    setTimeout(() => {
        this.animate = true;
    }, 100 * row);
  }
}

class Column {
  booked:boolean;
  seat:string;
  reserved:boolean;

  constructor(seat){
    this.seat = seat;
    this.reserved = false;
    this.booked = false;
  }

  get description(){
      if(this.booked) return `Seat ${this.seat} is booked`
      else if(this.reserved) return `Seat ${this.seat} is reserved`
      else return `Seat ${this.seat} is available`
  }
}