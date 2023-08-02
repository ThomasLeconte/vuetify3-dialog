<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Dialog',
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    buttons: {
      type: Array as () => { key: string, title: string, value: string, color?: string, variant?: string }[],
    },
    icon: {
      type: String,
      default: ''
    },
    level: {
      type: String as () => 'info' | 'warning' | 'error' | 'success',
      default: 'info'
    }
  },
  data(){
    return {
      showDialog: true
    }
  },
  computed: {
    _buttons(){
      if(this.buttons && this.buttons.length > 0) return this.buttons
      else return [
        { key: 'cancel', title: 'Annuler', value: 'cancel', color: 'grey', variant: 'text' },
        { key: 'ok', title: 'OK', value: 'ok', color: this.level, variant: 'tonal' }
      ]
    },
    _icon(){
      switch (this.level) {
        case 'info':
          return 'mdi-information'
        case 'warning':
          return 'mdi-alert'
        case 'error':
          return 'mdi-alert-circle'
        case 'success':
          return 'mdi-check-circle'
        default:
          return 'mdi-information'
      }
    },
    _color(){
      return this.level === 'info' ? 'primary' : this.level
    }
  },
  methods: {
    close(value: string){
      this.showDialog = false
      this.$emit('closeDialog', value)
    }
  }
})
</script>


<template>
  <v-dialog v-model="showDialog">
    <v-card>
      <v-card-title class="d-flex align-center"><v-icon :color="_color" class="mr-2">{{_icon}}</v-icon>{{title}}</v-card-title>
      <v-card-text>{{text}}</v-card-text>
      <v-card-actions>
        <v-btn
          v-for="button in _buttons"
          :key="button.value"
          :color="button.color || _color"
          :variant="button.variant"
          @click="close(button.key)"
        >
          {{button.title}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">

</style>