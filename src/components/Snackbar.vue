<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Snackbar",
  props: {
    text: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'text'
    },
    timeout: {
      type: Number,
      default: 4000
    },
    level: {
      type: String as () => 'info' | 'warning' | 'error' | 'success',
      default: 'info'
    }
  },
  watch: {
    showSnackbar(val){
      if(!val) this.$emit('closeSnackbar')
    }
  },
  data(){
    return {
      showSnackbar: true
    }
  },
})
</script>

<template>
  <v-snackbar
    v-model="showSnackbar"
    :timeout="timeout"
    :color="level"
    :dark="level === 'warning' || level === 'error'"
    :top="level === 'warning' || level === 'error'"
  >
    {{text}}
  </v-snackbar>
</template>

<style>

</style>