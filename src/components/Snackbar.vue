<script setup lang="ts">
import { ref } from 'vue';
import { VSnackbar, VLayout } from 'vuetify/lib/components/index.mjs';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  location: {
    type: String as () => 'top' | 'bottom' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right',
    required: true
  },
  level: {
    type: String as () => 'info' | 'warning' | 'error' | 'success',
    default: 'info'
  },
  notifyOptions: {
    type: Object,
    default: () => ({})
  },
  onCloseSnackbar: {
    type: Function,
    default: () => {}
  }
})

// ------- EVENTS -------
const emit = defineEmits(['closeSnackbar'])

// ------- DATA -------
let showSnackbar = ref(true)

// ------- METHODS -------
function close(){
  showSnackbar.value = false
  props.onCloseSnackbar()
  emit('closeSnackbar')
}
</script>

<template>
  <VLayout>
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
  </VLayout>
</template>

<style>

</style>
