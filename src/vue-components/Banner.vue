<script setup lang="ts">
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import { VBtn, VSpacer, VBanner, VLayout } from 'vuetify/lib/components/index.mjs';
import DOMPurify from 'dompurify';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  htmlContent: {
    type: String,
    required: false
  },
  level: {
    type: String as () => 'info' | 'warning' | 'error' | 'success',
    required: false
  },
  closable: {
    type: Boolean,
    default: true
  },
  bannerOptions: {
    type: Object,
    default: () => ({})
  }
})

// ------- EVENTS -------
const emit = defineEmits(['closeBanner'])

// ------- DATA -------
let showBanner = ref(true)

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
  showBanner.value = false
  emit('closeBanner')
}
</script>

<template>
  <VLayout>
    <VBanner
      v-if="showBanner"
      :bg-color="level ?? 'default'"
      class="vuetify3-banner"
      v-bind="bannerOptions">
        <div class="d-flex align-start justify-space-between w-100">
          <div>
            <template v-if="htmlContent">{{ sanitizedHtml }}</template>
            <template v-else>{{ text }}</template>
          </div>
          <div v-if="closable">
            <VBtn v-if="closable" @click="close" icon="mdi-close" variant="tonal"></VBtn>
          </div>
        </div>
    </VBanner>
  </VLayout>
</template>
