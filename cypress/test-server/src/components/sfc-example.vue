<template>
  <h1>SFC Example</h1>
  <v-btn id="sfc-create-dialog" @click="_createDialog">Dialog</v-btn>
  <v-btn id="sfc-create-notification" @click="_createNotification">Notify</v-btn>
  <v-btn id="sfc-create-notification" @click="_createBottomSheet">BottomSheet</v-btn>
</template>

<script setup lang="ts">
import { createDialog, createNotification, createBottomSheet } from 'vuetify3-dialog'

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

const _createBottomSheet = () => createBottomSheet({
    title: "My SFC bottom-sheet",
    text: "Hello world!"
  })
</script>

<style>

</style>