<script lang="ts">
import { defineComponent } from "vue";
import { VSnackbar } from 'vuetify/lib/components/index.mjs'

export default defineComponent({
  name: "Snackbar",
  components: {
    VSnackbar
  },
  props: {
    text: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'elevated'
    },
    rounded: {
      type: String,
      required: false
    },
    timeout: {
      type: Number,
      default: 4000
    },
    location: {
      type: String,
      default: 'top right'
    },
    level: {
      type: String as () => 'info' | 'warning' | 'error' | 'success',
      default: 'info'
    },
    notifyOptions: {
      type: Object,
      default: () => ({})
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
  <VSnackbar
    v-bind="notifyOptions"
    v-model="showSnackbar"
    :timeout="timeout"
    :variant="variant"
    :color="level"
    :rounded="rounded"
    :location="location"
    :dark="level === 'warning' || level === 'error'"
  >
    {{text}}
  </VSnackbar>
</template>

<style>

</style>