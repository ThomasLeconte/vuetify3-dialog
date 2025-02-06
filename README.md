# Vuetify 3 Dialog ![Javascript](https://img.shields.io/badge/-Javascript-F7DF1E?style=rounded&logo=javascript&logoColor=black) ![Typescript](https://img.shields.io/badge/-Typescript-2e86de?style=rounded&logo=typescript&logoColor=black) ![Vue.js](https://img.shields.io/badge/-Vue.js-4FC08D?style=rounded&logo=vue.js&logoColor=white)
Lite Vue plugin working with Vuetify, allowing you to show dialogs or snackbars programatically.
> Inspired by [vuetify-dialog](https://www.npmjs.com/package/vuetify-dialog) (@yariksav)

## Summary
- [Installation](#install-it)
- [Usage](#usage)
  - [Dialogs](#dialogs)
  - [Snackbars](#snackbars)
  - [Bottom sheets](#bottom-sheets)
  - [SFC compatibility](#sfc-compatibility)
- [Developers](#developers)

## Install it
First, run `npm install vuetify3-dialog`.  
**⚠️You must have Vuetify installed on your project. If you don't have installed yet, please follow this link : [Install Vuetify](https://vuetifyjs.com/en/getting-started/installation/)**  

Then, install this plugin in your app entry point (main.js or main.ts) like following :
```js
//main.js

import { createApp } from 'vue'
import App from './App.vue'
import vuetifyInstance from './plugins/vuetify' //Or wherever you have your vuetify instance
import {Vuetify3Dialog} from 'vuetify3-dialog'

const app = createApp(App)
app.use(vuetifyInstance); //You must use Vuetify before Vuetify3Dialog
        ...
app.use(Vuetify3Dialog, {
  defaults: {
    //You can pass default options for dialogs, dialog's card, snackbars or bottom-sheets here
  }
})
app.mount('#app')
```

## Usage
You can now use the plugin in your components. There is two main variable available in all your project : `$dialog` and `$notify`. Each of them have methods to create full personalized dialogs or snackbars, and other ones to create simple dialogs or snackbars with a message and a title, by precizing level of severity. Let's see how to use them.

### Dialogs
You can create a fully personalized dialog with the following method :
```js
this.$dialog.create({
  title: "My title",
  text: "My dialog message",
  buttons: [
    { title: 'My first button', key: 'button1', /* any v-btn api option */ },
    ...
  ],
  cardOptions: {
    //any v-card api options
  },
  dialogOptions: {
    //any v-dialog api options
  }
}).then(({buttonKey, result}) => {
  //Do something with the anwser corresponding to the key of the clicked button
})
```
<br>

#### Custom dialog inner component 
You can pass a custom component to render inside the dialog, with it props binded! Here's how to do it :
```js
this.$dialog.create({
  ..., //other options
  customComponent: {
    component: MyCustomComponent,
    props: { myComponentProp: 'Hello world!' }
  },
}).then(() => {
})
```
> [!WARNING]  
> ⚠ If you declare a persistent dialog option, take care that your component emit a `closeDialog` event when you want to close it.

<hr>
<br>

`this.$dialog` also have a `confirm` method, which is a shortcut for the previous method with only two buttons : "Yes" and "No". 
```js
this.$dialog.confirm({title: "My title", text: "My dialog message", cancelText: "No", confirmationText: "Yes", cancelButtonOptions: ..., confirmationButtonOptions: ...})
.then(({buttonKey, result}) => {
  //Do something with the boolean anwser
})
```

You can also create a simple dialog with a message and a title, by precizing level of severity :
```js
this.$dialog.info({ 
  title: "My title",
  text: "My dialog message",
  cardOptions: ..., 
  buttonOptions: ...
}).then(() => {
  //Do something when the user close the dialog
})
```
There is 4 levels of severity : `info`, `success`, `warning` and `error`.

__Usefull links:__
- [v-card api](https://vuetifyjs.com/en/api/v-card/)  
- [v-dialog api](https://vuetifyjs.com/en/api/v-dialog/)   

### Snackbars
You can create a fully personalized snackbar with the following method :
```js
//message, timeout, level, variant, rounded, position
this.$notify.create({
  text: "My snackbar message",
  htmlContent: "<b>My snackbar message</b>", // optional (included in 1.5.3)
  level: 'success',
  location: 'top right',
  notifyOptions: {
    //any v-snackbar api options
  }
})
.then(() => {
  //Do something with the anwser corresponding to the key of the clicked button
})
```

You can also create a simple snackbar with a message and a title, by precizing level of severity :
```js
this.$notify.info(
  "My snackbar message",
  { variant: 'outlined' } // any v-snackbar api options
).then(() => {
  //Do something when the user close the snackbar
})
```
There is 4 levels of severity : `info`, `success`, `warning` and `error`.

__Usefull links:__
- [v-snackbar api](https://vuetifyjs.com/en/api/v-snackbar/)

### Bottom sheets

> [!WARNING]  
> ⚠ This feature requires Vuetify 3.4.0 or higher

You can create a fully personalized bottom sheet with a contained list or a card dialog. **To stay consistent, these two features cannot be used at same time.**  
Here is an example with a list :
```js
this.$bottomSheet.create({
  title: "My title",
  text: "My bottom sheet message",
  bottomSheetOptions: {
    // any v-bottom-sheet api options
  },
  items: [
    { title: "Item 1", value: "item1", ... /* any v-list-item api option */ },
    { title: "Item 2", value: "item2" },
    { title: "Item 3", value: "item3" }
  ]
}).then((anwser) => {
  //Do something with the anwser corresponding to the value of the clicked item
})
```

Here is an example with a card :
```js
this.$bottomSheet.create({
  bottomSheetOptions: {
    // any v-bottom-sheet api options
  },
  dialogOptions: {
    //same arguments as $dialog.create()
    title: "My bottom-sheet card dialog",
    text: "Hello world!",
    buttons: [
      { title: 'My first button', key: 'button1', /* any v-btn api option */ },
      ...
    ]
  }
}).then((anwser) => {
  //Do something with the anwser corresponding to the key of the clicked button
})
```




### SFC compatibility
If you want to use this plugin in an SFC component, some methods are available. Working principe is the same as previous methods, and arguments are the same.  
```html
<script setup>
import { createDialog, warnDialog, confirmDialog } from 'vuetify3-dialog'
import { createNotification, notifySuccess } from 'vuetify3-dialog'
import { createBottomSheet } from 'vuetify3-dialog'

if(true){
  createDialog({ title: "My title", text: "My dialog message" })
  .then(({buttonKey, result}) => {
    //Do something with the anwser corresponding to the key of the clicked button
  })

  notifySuccess("My snackbar message").then(() => {})

  createBottomSheet({ title: "My bottomsheet title", text: "My bottomsheet message" })
  .then(() => {})
}
</script>
```

## Developers
If you want to contribute to this project, you can clone it and run `npm install` to install dependencies.  

Then, you need to test your changes. A demo project is located at `cypress/test-server` of this repository. You can launch it with `npm run test-server`.    
If you have the following error : <span style="color: #e74c3c">[vite] Internal server error: Failed to resolve entry for package "vuetify3-dialog". The package may have incorrect main/module/exports specified in its package.json.</span>, make sure you have run `npm run build` before to build the plugin and make it available for the demo project.  

Finally, when you will have finish your changes, make sure all tests are passing with `npm run test`, thanks in advance !
