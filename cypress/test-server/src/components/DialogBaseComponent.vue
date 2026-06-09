<template>
  <v-dialog v-model="show" v-bind="$attrs">
    <v-card>{{title}}</v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue';
import {CreateDialogOptions} from 'vuetify3-dialog'

// EVENTS
const emit = defineEmits(['closeDialog'])

// PROPS
withDefaults(defineProps<CreateDialogOptions>(), {})

// DATA
const show = ref(true)

// WATCH
watch(show, (value) => {
  if(value === false) {
    close();
  }
})

// FUNCTIONS
function close() {
  emit('closeDialog', "toto")

}
</script>
