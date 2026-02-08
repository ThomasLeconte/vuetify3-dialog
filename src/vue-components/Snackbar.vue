<script setup lang="ts">
import { ref, computed } from 'vue';
import { VSnackbar, VLayout } from 'vuetify/lib/components/index.mjs';
import DOMPurify from 'dompurify';

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

// ------- COMPUTED -------
const sanitizedHtml = computed(() => {
  if (!props.htmlContent) return '';
  
  return DOMPurify.sanitize(props.htmlContent, {
    ALLOWED_TAGS: ['b', 'i', 'u', 'em', 'strong', 'a', 'br', 'p', 'span'],
    ALLOWED_ATTR: ['href', 'title', 'target', 'class'],
    FORBID_ATTR: ['style', 'onclick', 'onerror', 'onload'],
    FORBID_TAGS: ['script', 'iframe']
  });
})

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
      <div v-if="htmlContent" v-html="sanitizedHtml"></div>
    </VSnackbar>
  </VLayout>
</template>
