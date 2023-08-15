<template>
  <h1>SFC Example</h1>
  <v-btn id="sfc-create-dialog" @click="_createDialog">Click me</v-btn>
  <v-btn id="sfc-create-notification" @click="_createNotification">Click me</v-btn>
</template>

<script setup lang="ts">
import { createDialog, createNotification } from 'vuetify3-dialog'

const _createDialog = () => createDialog({
    title: "My SFC dialog",
    text: "Hello world!"
  })

const _createNotification = () => createNotification({
    text: "My SFC notification!",
    level: 'success',
    notifyOptions: {
      timeout: 10000
    }
  })
</script>

<style>

</style>