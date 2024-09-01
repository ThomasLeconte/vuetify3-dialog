<template>
  <v-card rounded="lg">
    <v-card-title color="primary" class="d-flex justify-space-between align-center">
      <div class="text-h5 text-medium-emphasis">
        Custom Dialog
      </div>
      <v-btn
        icon="mdi-close"
        variant="text"
        @click="close"
      ></v-btn>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="text-center">
      {{ message }}
      <br/>
      <v-btn
        color="purple"
        text="Nested Notification"
        @click="showNotification"
      ></v-btn>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="d-flex justify-end">
      <v-btn
        class="text-none"
        color="success"
        rounded="xl"
        text="Confirm"
        variant="flat"
        @click="close"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { createNotification } from 'vuetify3-dialog'

  const props = defineProps({
    message: {
      type: String,
      required: false
    }
  })

  const emit = defineEmits(['closeDialog'])
  function close() {
    emit('closeDialog', false)
  }

  function showNotification() {
    createNotification({
      text: "Notification from dialog!",
      notifyOptions: {
        timeout: 3000,
        location: 'bottom right'
      }
    })
  }
</script>
