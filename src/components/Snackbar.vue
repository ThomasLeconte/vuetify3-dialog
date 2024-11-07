<script setup lang="ts">
import { ref } from 'vue';
import { VSnackbar, VLayout } from 'vuetify/lib/components/index.mjs';

const props = defineProps({
  text: {
    type: String,
    required: false
  },
  htmlContent: {
    type: String,
    required: false
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
      <span v-if="text">{{text}}</span>
      <div v-if="htmlContent" v-html="htmlContent"></div>
    </VSnackbar>
  </VLayout>
</template>

<style>

</style>
