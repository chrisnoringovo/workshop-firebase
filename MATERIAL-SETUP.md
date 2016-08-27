This guide will take you through adding Angular Material 2 to your project.

# 1\. Check the CLI is installed

```bash
 npm install -g angular-cli
```

# 2\. Install Angular Material 2 components

We'll take the components we need from the [list of published packages here](https://www.npmjs.com/~angular2-material).

```bash
 npm install --save @angular2-material/{core,button,icon,input,menu,tabs,toolbar,tooltip}
```

(the core module is required as a peer dependency of other components)

# 3\. Add components to vendor bundle

During the build we have to copy `@angular2-material` folder from `node_modules` to `dist/vendor`. Just add a wildcard for all @angular2-material files to the end of the existing `vendorNpmFiles` array.

**angular-cli-build.js**

```javascript
 module.exports = function(defaults) {
   return new Angular2App(defaults, {
     vendorNpmFiles: [
       ...
       '@angular2-material/**/*'
     ]
   });
 };
```

# 4\. Configure SystemJS

First, you need to let SystemJS know where to look when you import `@angular2-material`. You can do this by adding the path to the Material folder to the `maps` object.

**src/system-config.ts**

```typescript
const map: any = {
  ...
  '@angular2-material': 'vendor/@angular2-material'
};
```

This says something like "when you look for an @angular2-material import, look inside the vendor folder" (the base folder will already be `dist`).

Next, you need to let SystemJS know how to process the new modules. Specifically, you need to point to the main files of each of the packages.

**src/system-config.ts**

```typescript

// put the names of any of your Material components here
const materialPkgs:string[] = [
  'core',
  'button',
  'icon',
  'input',
  'menu',
  'tabs',
  'toolbar',
  'tooltip'
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});
```

# 5\. Import the components

We are going to import the components in our application module:

**app.module.ts**

```typescript
@NgModule({
  imports: [
    ...
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule
  ],
  ...
})
```

# 6\. Extra setup for `md-menu`, `md-tooltip`, `md-icon`:

For alpha.7, you need to include the overlay styles in your app (temporary solution).

**index.html**

```html
<link href="vendor/@angular2-material/core/overlay/overlay.css" rel="stylesheet">
```

To use Material Design font we have to load it:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

# 7\. After Angular Material 2 is set up let's start [using it](MATERIAL-USAGE.md)
