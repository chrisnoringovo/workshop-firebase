Right after we [set up Angular Material 2](MATERIAL-SETUP.md) we can add these components to our app.

# 1\. Using Angular Material 2 components in AppComponent

Let's create a toolbar and tabbed control:

**app.component.html**

```html
<md-toolbar color="primary">

  <span>My cinema</span>

</md-toolbar>
```

```html
<md-tab-group>
  <md-tab>
    <template md-tab-label>Ticket</template>
    <template md-tab-content>

      <div class="container">
        <moviegoer></moviegoer>
      </div>

    </template>
  </md-tab>
  <md-tab>
    <template md-tab-label>Seats</template>
    <template md-tab-content>

      <div class="container">
        <theater></theater>
      </div>

    </template>
  </md-tab>
</md-tab-group>
```

We can remove a reference to `app.component.css` and use `.container` utility class added to **public/style.css**:
```css
@media (min-width: 768px) {
  .container {
      background-color: #f0f0f0;
      padding: 10px;
      display: flex;
      justify-content: center;
  }
  .container > * {
      max-width: 768px;
      width: 100%;
  }
}
```

Let's add a menu to our toolbar to let users log in:

```html
<md-toolbar color="primary">

  <span>My cinema</span>

  <span style="flex: 1 1 auto;"></span>

  <button md-icon-button [md-menu-trigger-for]="menu">
    <md-icon>account_circle</md-icon>
  </button>

  <md-menu x-position="before" #menu="mdMenu">

    <div *ngIf="!isAuth">

      <button md-menu-item disabled>
        Log in using:
      </button>

      <button (click)="login('google')" md-menu-item>
        <img width="24" src="google-logo.png"/>&nbsp; Google Account
      </button>

      <button (click)="login('facebook')" md-menu-item>
        <img width="24" src="facebook-logo.png"/>&nbsp; Facebook Account
      </button>

      <button (click)="login('twitter')" md-menu-item>
        <img width="24" src="twitter-logo.png"/>&nbsp; Twitter Account
      </button>

      <button (click)="login('github')" md-menu-item>
        <img width="24" src="github-logo.png"/>&nbsp; GitHub Account
      </button>

    </div>

    <button *ngIf="isAuth" md-button (click)="logout()">Logout</button>

  </md-menu>

</md-toolbar>
```

Then we can add 3rd tab, visible to authenticated users only:

```html
<md-tab *ngIf="isAuth">
  <template md-tab-label>My account</template>
  <template md-tab-content>

    <div class="container">
      <md-card>
        <md-card-header>
          <img md-card-avatar [src]="user.avatar || 'avatar.png'">
          <md-card-title>{{ user.name }}</md-card-title>
          <md-card-subtitle>{{ user.email || '(no email)' }}</md-card-subtitle>
        </md-card-header>
        <md-card-content>
          <p>You are logged in using
            <strong>{{ user.provider }}</strong>
          </p>
        </md-card-content>
        <md-card-actions>
          <button md-raised-button (click)="logout()">Logout</button>
        </md-card-actions>
      </md-card>
    </div>

  </template>
</md-tab>
```

# 2\. Using Angular Material 2 components in Theater component

Let's define a new template in `@Component`:

**theater.component.ts**

```html
<div class="auditorium" [ngClass]="{ animate: animate }">
    <div *ngFor="let row of rows" class="row" [ngClass]="{ animate : row.animate }">
        <button md-raised-button [ngClass]="{ booked: column.booked, reserved: column.reserved }" [title]="column.description" (click)="book(column)" *ngFor="let column of row.columns" class="seat">
        {{ column.seat }}
        </button>
    </div>
</div>
```

and update CSS:

**theater.component.css**

```css
.auditorium {
    margin-top: 110%;
    transition: margin-top 1000ms;
}

.auditorium.animate{
    margin-top: 0;
}

.row{
  position: relative;
  left: -200%;
  transition: left 1000ms;
  transition-delay: 1000ms;
}

.row.animate {
    left: 0;
}

.seat {
  min-width: 70px;
  margin: 0 5px 5px 0;
}

.seat:last-child {
  margin-right: 0;
}

.booked {
  background-color: #F44336;
}

.reserved {
  background-color: #2196F3;
}
```

# 3\. Using Angular Material 2 components in Moviegoer component

Let's externalize our template and remove any custom css in `@Component`:

**moviegoer.component.ts**

```html
@Component({
  moduleId: module.id,
  selector: 'moviegoer',
  templateUrl: 'moviegoer.component.html'
})
```

Create a file `moviegoer.component.html` containing 2 cards: movie info and customer info. This combination is actually the ticket!

**moviegoer.component.html**

```html
<md-card>

  <img md-card-image src="md-banner.jpg">

  <md-card-title-group>
    <md-card-title>
      {{ (movie | async )?.name }}
    </md-card-title>
    <md-card-subtitle>
      {{ (movie | async )?.length }}
      min.
    </md-card-subtitle>
  </md-card-title-group>

</md-card>

<br/>

<md-card>

  <md-card-title-group>
    <md-card-title md-tooltip="Your name">
      {{ (moviegoer | async)?.name }}
    </md-card-title>
    <md-card-subtitle md-tooltip="Your age">
      {{ (moviegoer | async)?.age }}
    </md-card-subtitle>
  </md-card-title-group>

  <md-card-content>
    <p>
      <md-input type="text" #newname placeholder="Name"></md-input>
      <md-input type="text" #age placeholder="Age">
        <span md-suffix>y.o.</span>
      </md-input>
    </p>
    <p>
      <button md-raised-button (click)="save(newname.value, age.value)">Update</button>
    </p>
  </md-card-content>

</md-card>
```

# 4\. Extra task:
- Update Theater component to use Angular 2 Material grid list
