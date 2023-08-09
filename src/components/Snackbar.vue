<script setup lang="ts">
import { defineComponent, ref, watch } from "vue";
import { VSnackbar } from 'vuetify/lib/components/index.mjs'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'elevated'
  },
  rounded: {
    type: String,
    required: false
  },
  timeout: {
    type: Number,
    default: 4000
  },
  location: {
    type: String,
    default: 'top right'
  },
  level: {
    type: String as () => 'info' | 'warning' | 'error' | 'success',
    default: 'info'
  },
  notifyOptions: {
    type: Object,
    default: () => ({})
  }
})

// ------- EVENTS -------
const emit = defineEmits(['closeSnackbar'])

// ------- DATA -------
let showSnackbar = ref(true)

// ------- WATCH -------
watch(() => showSnackbar, (val) => {
  if(!val) emit('closeSnackbar')
})
</script>

<template>
  <VSnackbar
    v-bind="notifyOptions"
    v-model="showSnackbar"
    :timeout="timeout"
    :variant="variant"
    :color="level"
    :rounded="rounded"
    :location="location"
    :dark="level === 'warning' || level === 'error'"
  >
    {{text}}
  </VSnackbar>
</template>

<style>

</style>