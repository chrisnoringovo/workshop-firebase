Right after we [set up Angular Material 2](MATERIAL-SETUP.md) we can add these components to our app.

# 1\. Using Angular Material 2 components in AppComponent

Let's create a toolbar and tabbed control:

**app.component.html**

```html
<md-toolbar>
  <span>Angular2 Auth with AngularFire2 and AngularMaterial2</span>
</md-toolbar>
```

```html
<md-tab-group>
  <md-tab>
    <template md-tab-label>Personal info</template>
    <template md-tab-content>
      <moviegoer></moviegoer>
    </template>
  </md-tab>
  <md-tab>
    <template md-tab-label>Seats selection</template>
    <template md-tab-content>
      <theater></theater>
    </template>
  </md-tab>
</md-tab-group>
```
