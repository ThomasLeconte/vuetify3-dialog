<template>
  <v-dialog v-model="show" v-bind="$attrs">
    <v-card>{{title}}</v-card>
  </v-dialog>
</template>

<script lang="ts">
import { ComponentObjectPropsOptions, defineComponent } from 'vue';
import {CreateDialogOptions} from 'vuetify3-dialog';

export default defineComponent({
  name: 'AnotherDialogBaseComponent',
  props: {} as ComponentObjectPropsOptions<CreateDialogOptions>,
  created() {
    // ...
  }
})
</script>
