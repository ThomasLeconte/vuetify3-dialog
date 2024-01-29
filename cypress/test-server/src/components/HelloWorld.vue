<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/logo.svg" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Vuetify</h1>

      <v-btn @click="dialog = true">Open dialog</v-btn>

      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block>Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="py-14" />

      <div class="d-flex flex-wrap justify-center align-start">

        <div class="card">
          <h3 class="primary-text">Dialogs</h3>
          <div class="mt-5">
            <v-btn id="create-dialog" @click="createDialog()">Create Dialog</v-btn>
            <v-btn id="create-custom-component-dialog" @click="createCustomComponentDialog()" color="warning">Custom component Dialog</v-btn>
            <v-btn id="success-dialog" @click="successDialog()" color="success">Success Dialog</v-btn>
            <v-btn id="confirm-dialog" @click="confirmDialog()" color="primary">Confirm Dialog</v-btn>
          </div>
        </div>

        <div class="card">
          <h3 class="primary-text">Notifications</h3>
          <div class="mt-5">
            <v-btn id="create-notification" @click="createNotification()">Create notification</v-btn>
            <v-btn id="error-notification" @click="errorNotification()" color="error">Error notification</v-btn>
          </div>
        </div>

        <div class="card">
          <h3 class="primary-text">Bottom sheets</h3>
          <div class="mt-5">
            <v-btn id="create-bottomsheet-card" @click="createBottomsheet()">bottom-sheet card</v-btn>
            <v-btn id="create-bottomsheet-list" @click="createBottomsheetList()">bottom-sheet list</v-btn>
          </div>
        </div>
      </div>

      <div>
        <sfcExampleVue/>
      </div>

    </v-responsive>
  </v-container>
</template>

<style>
  .card {
    border: 3px solid #333333;
    border-radius: 10px;
    padding: 15px;
    margin: 0 5px;
  }
</style>

<script lang="ts">
import { defineComponent } from "vue";
import MyComponent from "./MyComponent.vue";
import sfcExampleVue from "./sfc-example.vue";

  
export default defineComponent({
  name: "HelloWorld",
  components: {
    sfcExampleVue,
    MyComponent
  },
  data: () => ({
    show: true,
    dialog: false
  }),
  methods: {
    createDialog(){
      this.$dialog.create({
        title: "My dialog",
        text: "Hello world!",
        buttons: [
          { key: 'button1', title: 'Button 1', variant: 'outlined', color: 'error' },
          { key: 'button2', title: 'Button 2', variant: 'tonal', color: 'success' }
        ]
      })
    },
    createCustomComponentDialog(){
      this.$dialog.create({
        customComponent: {
          component: MyComponent,
          props: { message: "Hello world!" }
        },
        dialogOptions: {
          width: "600px",
          persistent: true
        }
      })
    },
    successDialog(){
      this.$dialog.success({title: "Hello world", text: "My success dialog"})
    },
    confirmDialog(){
      this.$dialog.confirm({title: "My confirm dialog", text: "Hello world!", level: 'warning', cancelText: 'Cancel button', confirmationText: 'Confirm button'})
        .then((v: boolean) => console.log(v))
    },
    createNotification(){
      this.$notify.create({
        text: "Hello world!",
        notifyOptions: {
          timeout: 3000,
          location: 'top right'
        }
      })
    },
    errorNotification(){
      this.$notify.error("Hello error!\nLorem ipsum dolor sit amet, consectetur!", {timeout: 3000, location: 'bottom right'})
    },
    createBottomsheet(){
      this.$bottomSheet.create({
        bottomSheetOptions: { inset: true },
        dialogOptions: {
          title: "My bottom-sheet card dialog",
          text: "Hello world!",
          buttons: [
            { key: 'button1', title: 'Button 1', variant: 'outlined', color: 'error' },
            { key: 'button2', title: 'Button 2', variant: 'tonal', color: 'success' }
          ]
        }
      }).then((value: any) => {
        console.log(value)
      })
    },
    createBottomsheetList(){
      this.$bottomSheet.create({
        items: [
          { title: "Item 1", value: "item1" },
          { title: "Item 2", value: "item2" },
          { title: "Item 3", value: "item3" }
        ]
      }).then((value: any) => {
        console.log(value)
      })
    }
  }
})
</script>
