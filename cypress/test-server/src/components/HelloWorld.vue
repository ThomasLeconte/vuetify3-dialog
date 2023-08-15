<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/logo.svg" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Vuetify</h1>

      <div class="py-14" />

      <div>
        <v-btn id="create-dialog" @click="createDialog()">Create Dialog</v-btn>
        <v-btn id="success-dialog" @click="successDialog()" color="success">Success Dialog</v-btn>
        <v-btn id="confirm-dialog" @click="confirmDialog()" color="primary">Confirm Dialog</v-btn>
      </div>

      <div class="mt-5">
        <v-btn id="create-notification" @click="createNotification()">Create notification</v-btn>
        <v-btn id="error-notification" @click="errorNotification()" color="error">Error notification</v-btn>
      </div>

      <div>
        <sfcExampleVue/>
      </div>

    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import sfcExampleVue from "./sfc-example.vue";

  
export default defineComponent({
  name: "HelloWorld",
  components: {
    sfcExampleVue
  },
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
    successDialog(){
      this.$dialog.success("Hello world!", "My success dialog")
    },
    confirmDialog(){
      this.$dialog.confirm("My confirm dialog", "Hello world!", 'warning', 'Cancel button', 'Confirm button')
        .then((v: boolean) => console.log(v))
    },
    createNotification(){
      this.$notify.create({
        text: "Hello world!",
        notifyOptions: {
          timeout: 30000
        }
      })
    },
    errorNotification(){
      this.$notify.error("Hello error!")
    }
  }
})
</script>
