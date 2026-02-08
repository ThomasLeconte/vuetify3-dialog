<template>
  <div class="sfc-container">
    <h2 class="text-h5 font-weight-bold mb-4">SFC Examples</h2>

    <v-divider class="mb-4" />

    <v-row class="justify-center">
      <!-- Dialog Examples -->
      <v-col cols="12" md="3" class="mb-3">
        <v-card class="sfc-card" elevation="2">
          <v-card-title class="bg-primary text-white pa-2">
            <v-icon left small>mdi-message-text</v-icon>
            Dialog
          </v-card-title>
          <v-card-text class="pa-3">
            <div class="d-flex flex-column gap-2">
              <v-btn id="sfc-create-dialog" @click="_createDialog" block small>Create Dialog</v-btn>
              <v-btn id="sfc-confirm-dialog" @click="_createConfirmDialog" block small color="warning">Confirm Dialog</v-btn>
              <v-btn id="sfc-success-dialog" @click="_createSuccessDialog" block small color="success">Success Dialog</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Banner Examples -->
      <v-col cols="12" md="3" class="mb-3">
        <v-card class="sfc-card" elevation="2">
          <v-card-title class="bg-error text-white pa-2">
            <v-icon left small>mdi-bell</v-icon>
            Banner
          </v-card-title>
          <v-card-text class="pa-3">
            <div class="d-flex flex-column gap-2">
              <v-btn id="sfc-create-banner" @click="_createBanner" block small>Info Banner</v-btn>
              <v-btn id="sfc-success-banner" @click="_createSuccessBanner" block small color="success">Success Banner</v-btn>
              <v-btn id="sfc-warning-banner" @click="_createWarningBanner" block small color="warning">Warning Banner</v-btn>
              <v-btn id="sfc-error-banner" @click="_createErrorBanner" block small color="error">Error Banner</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Notification Examples -->
      <v-col cols="12" md="3" class="mb-3">
        <v-card class="sfc-card" elevation="2">
          <v-card-title class="bg-info text-white pa-2">
            <v-icon left small>mdi-bell-ring</v-icon>
            Notification
          </v-card-title>
          <v-card-text class="pa-3">
            <div class="d-flex flex-column gap-2">
              <v-btn id="sfc-create-notification" @click="_createNotification" block small>Create Notification</v-btn>
              <v-btn id="sfc-info-notification" @click="_createInfoNotification" block small color="info">Info Notification</v-btn>
              <v-btn id="sfc-success-notification" @click="_createSuccessNotification" block small color="success">Success Notification</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Bottom Sheet Examples -->
      <v-col cols="12" md="3" class="mb-3">
        <v-card class="sfc-card" elevation="2">
          <v-card-title class="bg-secondary text-white pa-2">
            <v-icon left small>mdi-cellphone-dock</v-icon>
            Bottom Sheet
          </v-card-title>
          <v-card-text class="pa-3">
            <div class="d-flex flex-column gap-2">
              <v-btn id="sfc-create-bottomsheet" @click="_createBottomSheet" block small>Card Bottom Sheet</v-btn>
              <v-btn id="sfc-create-bottomsheet-list" @click="_createBottomSheetList" block small>List Bottom Sheet</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { createDialog, createNotification, createBottomSheet, createBanner, infoBanner, successBanner, warningBanner, errorBanner } from 'vuetify3-dialog'

// Dialog Examples
const _createDialog = () => createDialog({
    title: "My SFC dialog",
    text: "Hello world!"
  })

const _createConfirmDialog = () => createDialog({
  title: "Confirm Action",
  text: "Are you sure you want to proceed?",
  buttons: [
    { key: false, title: 'Cancel', color: 'grey' },
    { key: true, title: 'Confirm', color: 'primary' }
  ]
})

const _createSuccessDialog = () => createDialog({
  title: "Success",
  text: "Operation completed successfully!",
  level: 'success'
})

// Banner Examples
const _createBanner = () => createBanner({
  text: "This is an informational banner message"
})

const _createSuccessBanner = () => successBanner("Operation completed successfully!")

const _createWarningBanner = () => warningBanner("This action cannot be undone!")

const _createErrorBanner = () => errorBanner("Critical error occurred!")

// Notification Examples
const _createNotification = () => createNotification({
    text: "My SFC notification!",
    level: 'success',
    notifyOptions: {
      timeout: 10000
    }
  })

const _createInfoNotification = () => createNotification({
  text: "This is an informational message",
  level: 'info'
})

const _createSuccessNotification = () => createNotification({
  text: "Operation completed successfully!",
  level: 'success'
})

// Bottom Sheet Examples
const _createBottomSheet = () => createBottomSheet({
    title: "My SFC bottom-sheet",
    text: "Hello world!"
  })

const _createBottomSheetList = () => createBottomSheet({
  items: [
    { title: "Option 1", value: "option1" },
    { title: "Option 2", value: "option2" },
    { title: "Option 3", value: "option3" }
  ]
})
</script>

<style scoped>
.sfc-container {
  width: 100%;
}

.sfc-card {
  border-radius: 8px;
  transition: all 0.2s ease;
}

.sfc-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.v-card-title {
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.d-flex.flex-column.gap-2 {
  gap: 6px;
}

.v-btn {
  font-size: 0.8rem;
  padding: 0 8px;
  min-height: 32px;
}
</style>
