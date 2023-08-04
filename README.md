# Vuetify 3 Dialog
Lite Vue plugin working with Vuetify, allowing you to show dialogs or snackbars programatically.

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
app.use(Vuetify3Dialog, { vuetify: vuetifyInstance }) //You must pass your vuetify instance as an option
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
    { title: 'My first button', key: 'button1' },
    { title: 'My second button', key: 'button2' },
    { title: 'My third button', key: 'button3' },
  ],
  cardOptions: {
    //any v-card api option
  }
}).then((anwser) => {
  //Do something with the anwser corresponding to the key of the clicked button
})
```

`this.$dialog` also have a `confirm` method, which is a shortcut for the previous method with only two buttons : "Yes" and "No". 
```js
this.$dialog.confirm("My title", "My dialog message", 'warning', 'Cancel', 'Confirm')
.then((anwser) => {
  //Do something with the boolean anwser
})
```

You can also create a simple dialog with a message and a title, by precizing level of severity :
```js
this.$dialog.info(
  "My dialog message",
  "My title", //optional
  { width: '500px'} //optional v-card api option
).then(() => {
  //Do something when the user close the dialog
})
```
There is 4 levels of severity : `info`, `success`, `warning` and `error`.

### Snackbars
You can create a fully personalized snackbar with the following method :
```js
//message, timeout, level, variant, rounded, position
this.$notify.create({
  text: "My snackbar message",
  level: 'success',
  location: 'top right',
  notifyOptions: {
    //any v-snackbar api option
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
  { variant: 'outlined' } // any v-snackbar api option
).then(() => {
  //Do something when the user close the snackbar
})
```
There is 4 levels of severity : `info`, `success`, `warning` and `error`.
