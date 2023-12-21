<script setup lang="ts">
import { defineComponent, ref, watch } from "vue";
import { VSnackbar } from 'vuetify/lib/components/index.mjs'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
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

// ------- METHODS -------
function close(){
  showSnackbar.value = false
  emit('closeSnackbar')
}
</script>

<template>
  <VSnackbar
    class="vuetify3-dialog-snackbar"
    v-bind="notifyOptions"
    v-model="showSnackbar"
    :color="level"
    :location="location"
    location-strategy="static"
    :dark="level === 'warning' || level === 'error'"
    @update:model-value="close()"
  >
    {{text}}
  </VSnackbar>
</template>

<style>

</style>