# Firebase in angular 2 with Material design

Firebase

Angular Fire

## Setup

```
git clone <repo>
npm install
ng serve
```

# Getting started
Go to https://firebase.google.com

Login

Click go to console

Create new project

Press Home

Click 'Add Firebase to your web app'. This will indicate
the needed config. Go to app.module.ts an change the config variable to
what the firebase console indicates.

## Application Development

### Adding data to database

Go to Firebase console

Before you start working with your database start off with disabling the security by default. To do that go into Database = > Rules ( tab ). 

It will show it as 

```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

Which means you will need to be authenticated to do anything. As we are starting out it is a good idea to allow for read/write access. However set this back when done experimenting. But for now set it to:

```
{
  "rules": {
    ".read": "auth == null",
    ".write": "auth == null"
  }
}
```

Go back to Data tab. Use the + to add a few fields as key/value pairs. Once you added a few try retrieving the data..

### Query data

Provided you have created some fields and disabled some security you should be able to query your data. Which can be done in two ways - Either with a relative or absolute address.

Relative address : 

```
var data = af.database.object('/user');
```

Absolute address:

```
https://fir-workshop-fb35a.firebaseio.com/user
```



#### Display data in app

To display data we just need to create a reference to our address and then display it when it is fetched

```
this.moviegoer = af.database.object('/user');
```

And display in UI

```
{{ (moviegoer | async)?.name }}
{{ (moviegoer | async)?.age }}
```
Note the use of the async pipe as well as ?, i.e nullable, because it is null until it arrives and we don't want to crash the template

#### CRUD object

**Create** 
We use the *set* method to achive a create, like so:

```
var user = af.database.object('/user');
user.set({ name : 'new name' });
```

**Update**

```
var user = af.database.object('/user');
user.update({ name : 'updated name' });
```

**Delete**

```
var user = af.database.object('/user');
user.remove();
```

#### CRUD lists

**Load data**

To fetch a list simply to as before but use the keyword *list* instead of *object*
```
this.af.database.list('/seats')
```

2nd version is that you can specify a query like so:

```
af.database.list('/items', {
  query: {
    limitToLast: 10,
    orderByKey: true
  }
})
```

Regardless of used version the data is displayed like so in the UI

```
  <li *ngFor="let item of items | async">
      {{ item.name }}
  </li>
```

**Create**

```
var list = af.database.list('/products');
list.push( { name : 'tomato' } );
```

**Update and Remove**

```
this.items = af.database.list('/items');

Show in UI

<li *ngFor="let item of items | async">
      <input type="text" #updatetext [value]="item.text" />
      <button (click)="updateItem(item.$key, updatetext.value)">Update</button>
      <button (click)="deleteItem(item.$key)">Delete</button>
    </li>

updateItem(key, newValue){
  this.items.update(key, { name : newValue });
}

deleteItem(key){
  this.items.remove( key );
}

```

## Workshop tasks

The idea is to build a movie booking app that many people can use. The movie in question should have a limited number of seats that can be booked. A seat can be reserved, booked or available. A reserved seat can be unreserved, a booked seat is paid for and cannot be given back. 

1. Render the theater component with actual data from the firebase database

2. Ensure when a booking is carried out that it is written to DB

2.a It should not be possible to carry out a booking on a reserverd place.

Bonus:
Try capture the moment when a seat is booked with a nice css graphic.