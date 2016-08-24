import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'theater',
  template: `
    <h3>Movie theater</h3>
    <div class="movies" [ngClass]="{ animate: animate }">
        <div *ngFor="let row of rows" class="row" [ngClass]="{ animate : row.animate }">
            <div [title]="column.description" (click)="book(column)" [ngClass]="{ booked: column.booked, reserved : column.reserved }" *ngFor="let column of row.columns" class="column">
            <span class="seat">{{ column.seat }}</span>
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

    constructor(){
        this.rows = new Array<Row>();

        setTimeout(() => {
            this.animate = true;
        },100);  

        for(var i=0; i< 10; i++) {
            this.rows.push( new Row(i + 1) );
        }
    }

    book(column:Column) {
        this.selectedSeat = column;
        console.log('book', column.seat);
        if(column.booked) {
            column.booked = false;
            column.reserved;
        } else if(column.reserved) {
            column.booked = true;
            column.reserved = false;
        } else if(column.booked) {
            column.booked = false;
        } else {
            column.reserved = true;
        }
        
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