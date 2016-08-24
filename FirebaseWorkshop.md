# Firebase in angular 2 with Material design

Firebase

Angular Fire

## Setup

```
git clone <repo>
npm install
ng serve
```

### Create an account

At the firebase page, Go to settings ( cog wheel ) and select "Add Firebase to your web app". This will give a popup window with all the credentials needed to codewise setup your app.

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

The data comes back as an observable. So retrieve it like so:

```
data.subscribe( data => {
   console.log( data );
}, err => {
   console.log(err);
})
```

#### Display data in app

This is not how we will do it initially however. To display data we just need to create a reference to our address and then display it when it is fetched

TODO  display data in app

TODO CRUD

TODO lists

### Working with authentication

TODO authentication

## Workshop tasks

The idea is to build a movie booking app that many people can use. The movie in question should have a limited number of seats that can be booked. A seat can be reserved, booked or available. A reserverd seat can be unreserved, a booked seat is paid for and cannot be given back. 

1. Render the theater component with actual data from the firebase database

2. Ensure when a booking is carried out that it is written to DB

2.a It should not be possible to carry out a booking on a reserverd place.

Bonus:
Try capture the moment when a seat is booked with a nice css graphic.