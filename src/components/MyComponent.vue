<template>
  <h1 @click="close()">Coucou !</h1>
</template>

<script>
import { defineEmits } from 'vue'
export default {
  name: 'MyComponent',
  // setup() {
  //   const emits = defineEmits(['closeDialog']);
  //   return {
  //     emits
  //   }
  // },
  methods: {
    close() {
      this.$emit('closeDialog', false)
    }
  }
}
</script>

<style>

</style>