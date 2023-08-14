<template>
  <h1>SFC Example</h1>
  <v-btn id="sfc-create-dialog" @click="_createDialog">Click me</v-btn>
</template>

<script setup lang="ts">
import { createDialog } from 'vuetify3-dialog'

const _createDialog = () => createDialog({
    title: "My SFC dialog",
    text: "Hello world!"
  })
</script>

<style>

</style>