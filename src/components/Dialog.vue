<script setup lang="ts">
import { ComponentOptions } from 'types';
import { Component, PropType, ref, watch } from 'vue';
import { VDialog } from 'vuetify/lib/components/index.mjs';
import Card from './Card.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  buttons: {
    type: Array as () => any[],
  },
  icon: {
    type: String,
    default: ''
  },
  level: {
    type: String as () => 'info' | 'warning' | 'error' | 'success',
    default: 'info'
  },
  cardOptions: {
    type: Object,
    default: () => ({})
  },
  dialogOptions: {
    type: Object,
    default: () => ({})
  },
  customComponent: {
    type: Object as PropType<ComponentOptions>,
    required: false
  }
})

// ------- EVENTS -------
const emit = defineEmits(['closeDialog'])

// ------- DATA -------
let showDialog = ref(true)

// ------- METHODS -------
function close(buttonKey: string | boolean, result?: any){
  showDialog.value = false
  emit('closeDialog', { buttonKey, result })
}

// ------- WATCH ---------
watch((showDialog), (newValue) => {
  if(!newValue){
    close(false)
  }
})
</script>

<template>
  <VDialog
    class="vuetify3-dialog-popup"
    v-model="showDialog"
    v-bind="dialogOptions"
  >
    <template v-if="customComponent">
      <component :is="customComponent.component" v-bind="customComponent.props" @closeDialog="close" ref="custom-component" />
    </template>
    <Card
      v-else
      v-bind="cardOptions"
      :title="title"
      :text="text"
      :buttons="buttons"
      :icon="icon"
      :level="level"
      @buttonClicked="close"
    />
  </VDialog>
</template>
