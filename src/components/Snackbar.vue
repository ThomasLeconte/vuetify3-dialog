<script setup lang="ts">
import { defineComponent, ref, watch } from "vue";
import { VSnackbar } from 'vuetify/lib/components/index.mjs'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  level: {
    type: String as () => 'info' | 'warning' | 'error' | 'success',
    default: 'info'
  },
  location: {
    type: String,
    default: 'top right'
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
    class="vuetify3-dialog-snackbar"
    v-bind="notifyOptions"
    v-model="showSnackbar"
    :color="level"
    :location="location"
    :dark="level === 'warning' || level === 'error'"
  >
    {{text}}
  </VSnackbar>
</template>

<style>

</style>