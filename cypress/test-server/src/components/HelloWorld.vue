<template>
  <v-container class="fill-height pa-0">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/logo.svg" class="mb-4" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold mb-2">Vuetify3 Dialog</h1>
      <div class="text-h6 font-weight-regular mb-8">Interactive Demo</div>

      <v-divider class="mb-8" />

      <v-row class="justify-center">
        <!-- Dialogs Section -->
        <v-col cols="12" md="3" class="mb-4">
          <v-card class="demo-card" elevation="4">
            <v-card-title class="bg-primary text-white">
              <v-icon left>mdi-message-text</v-icon>
              Dialogs
            </v-card-title>
            <v-card-text class="pt-4">
              <div class="d-flex flex-column gap-2">
                <v-btn id="create-dialog" @click="createDialog()" block>Create Dialog</v-btn>
                <v-btn id="create-custom-component-dialog" @click="createCustomComponentDialog()" color="warning" block>Custom Component</v-btn>
                <v-btn id="success-dialog" @click="successDialog()" color="success" block>Success Dialog</v-btn>
                <v-btn id="confirm-dialog" @click="confirmDialog()" color="primary" block>Confirm Dialog</v-btn>
                <v-btn id="custom-component-dialog-notif" @click="customComponentDialogNotif()" color="brown" block>Dialog w/Notification</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Banners Section -->
        <v-col cols="12" md="3" class="mb-4">
          <v-card class="demo-card" elevation="4">
            <v-card-title class="bg-error text-white">
              <v-icon left>mdi-bell</v-icon>
              Banners
            </v-card-title>
            <v-card-text class="pt-4">
              <div class="d-flex flex-column gap-2">
                <v-btn id="create-banner" @click="createBanner()" block>Info Banner</v-btn>
                <v-btn id="success-banner" @click="successBanner()" color="success" block>Success Banner</v-btn>
                <v-btn id="warning-banner" @click="warningBanner()" color="warning" block>Warning Banner</v-btn>
                <v-btn id="error-banner" @click="errorBanner()" color="error" block>Error Banner</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Notifications Section -->
        <v-col cols="12" md="3" class="mb-4">
          <v-card class="demo-card" elevation="4">
            <v-card-title class="bg-info text-white">
              <v-icon left>mdi-bell-ring</v-icon>
              Notifications
            </v-card-title>
            <v-card-text class="pt-4">
              <div class="d-flex flex-column gap-2">
                <v-btn id="create-notification" @click="createNotification()" block>Create Notification</v-btn>
                <v-btn id="info-notification" @click="infoNotification()" color="info" block>Info Notification</v-btn>
                <v-btn id="success-notification" @click="successNotification()" color="success" block>Success Notification</v-btn>
                <v-btn id="warning-notification" @click="warningNotification()" color="warning" block>Warning Notification</v-btn>
                <v-btn id="error-notification" @click="errorNotification()" color="error" block>Error Notification</v-btn>
                <v-btn id="html-notification" @click="createNotificationWithHTML()" color="purple" block>HTML Notification</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Bottom Sheets Section -->
        <v-col cols="12" md="3" class="mb-4">
          <v-card class="demo-card" elevation="4">
            <v-card-title class="bg-secondary text-white">
              <v-icon left>mdi-cellphone-dock</v-icon>
              Bottom Sheets
            </v-card-title>
            <v-card-text class="pt-4">
              <div class="d-flex flex-column gap-2">
                <v-btn id="create-bottomsheet-card" @click="createBottomsheet()" block>Card Bottom Sheet</v-btn>
                <v-btn id="create-bottomsheet-list" @click="createBottomsheetList()" block>List Bottom Sheet</v-btn>
                <v-btn id="create-bottomsheet-custom" @click="createBottomsheetCustom()" color="teal" block>Custom Bottom Sheet</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="my-8" />

      <!-- SFC Examples Section -->
      <v-row class="justify-center">
        <v-col cols="12" md="8">
          <v-card class="demo-card" elevation="4">
            <v-card-title class="bg-success text-white">
              <v-icon left>mdi-code-tags</v-icon>
              SFC Component Examples
            </v-card-title>
            <v-card-text class="pt-4">
              <sfcExampleVue/>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-responsive>
  </v-container>
</template>

<style scoped>
.demo-card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.demo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
}

.v-card-title {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.d-flex.flex-column.gap-2 {
  gap: 8px;
}

.v-btn {
  text-transform: none;
  font-weight: 500;
  letter-spacing: 0.5px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import MyComponent from "./MyComponent.vue";
import DialogNotifComponent from "./DialogNotifComponent.vue";
import sfcExampleVue from "./sfc-example.vue";


export default defineComponent({
  name: "HelloWorld",
  components: {
    sfcExampleVue,
    MyComponent,
    DialogNotifComponent
  },
  data: () => ({
    show: true
  }),
  methods: {
    // Dialog Methods
    createDialog(){
      this.$dialog.create({
        title: "My dialog",
        text: "Hello world!",
        icon: "mdi-cookie",
        buttons: [
          { key: 'button1', title: 'Button 1', variant: 'outlined', color: 'error' },
          { key: 'button2', title: 'Button 2', variant: 'tonal', color: 'success' }
        ]
      }).then((key: any) => console.log(key))
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
    customComponentDialogNotif(){
      this.$dialog.create({
        customComponent: {
          component: DialogNotifComponent,
          props: { message: "Notification within Dialog!" }
        },
        dialogOptions: {
          width: "600px"
        }
      })
    },
    successDialog(){
      this.$dialog.success({title: "My success dialog", text: "Hello world!"})
    },
    confirmDialog(){
      this.$dialog.confirm({title: "My confirm dialog", text: "Hello world!", level: 'warning', cancelText: 'Cancel button', confirmationText: 'Confirm button'})
        .then((v: boolean) => console.log(v))
    },

    // Banner Methods
    createBanner() {
      this.$banner.create({
        text: "This is an informational banner message!"
      })
    },
    successBanner() {
      this.$banner.success("Operation completed successfully!")
    },
    warningBanner() {
      this.$banner.warning("This action cannot be undone!")
    },
    errorBanner() {
      this.$banner.error("This is a critical error that needs attention!")
    },

    // Notification Methods
    createNotification(){
      this.$notify.create({
        text: "Hello world!",
        notifyOptions: {
          timeout: 3000,
          location: 'top right'
        }
      })
    },
    infoNotification() {
      this.$notify.info("This is an informational message", { timeout: 3000 })
    },
    successNotification() {
      this.$notify.success("Operation completed successfully!", { timeout: 3000 })
    },
    warningNotification() {
      this.$notify.warning("Please check your input data", { timeout: 3000 })
    },
    errorNotification(){
      this.$notify.error("Hello error! Lorem ipsum dolor sit amet, consectetur!", {timeout: 3000, location: 'bottom right'})
    },
    createNotificationWithHTML(){
      this.$notify.create({
        text: "Hello world!",
        htmlContent: "<b>HTML content</b>",
        notifyOptions: {
          timeout: 3000,
          location: 'top right'
        }
      })
    },

    // Bottom Sheet Methods
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
    },
    createBottomsheetCustom() {
      this.$bottomSheet.create({
        bottomSheetOptions: { inset: true },
        dialogOptions: {
          title: "Custom Bottom Sheet",
          text: "This is a custom bottom sheet with advanced options",
          buttons: [
            { key: 'cancel', title: 'Cancel', variant: 'text', color: 'grey' },
            { key: 'confirm', title: 'Confirm', variant: 'flat', color: 'primary' }
          ]
        }
      })
    }
  }
})
</script>
