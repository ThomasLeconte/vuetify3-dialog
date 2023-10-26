<template>
  <h1 @click="close()">{{message}}</h1>
</template>

<script>
import { defineEmits } from 'vue'
export default {
  name: 'MyComponent',
  props: {
    message: {
      type: String,
      required: false
    }
  },
  methods: {
    close() {
      this.$emit('closeDialog', false)
    }
  }
}
</script>

<style>

</style>