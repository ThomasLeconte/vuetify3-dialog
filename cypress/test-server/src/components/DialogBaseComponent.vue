<template>
  <v-dialog v-model="show" v-bind="$attrs">
    <v-card>{{title}}</v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import {CreateDialogOptions} from 'vuetify3-dialog'

const show = ref(true)
const props = withDefaults(defineProps<CreateDialogOptions>(), {})
onMounted(console.log(props))
</script>
