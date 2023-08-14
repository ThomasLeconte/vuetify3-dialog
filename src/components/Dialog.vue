<script setup lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { VIcon, VCard, VCardTitle, VCardText, VCardActions, VBtn, VDialog } from 'vuetify/lib/components/index.mjs'

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
    type: Array as () => { key: string | boolean, title: string, value: string, color?: string, variant?: string }[],
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
  }
})

// ------- EVENTS -------
const emit = defineEmits(['closeDialog'])

// ------- DATA -------
let showDialog = ref(true)

// ------- COMPUTED -------
const _buttons = computed(() => {
  if(props.buttons && props.buttons.length > 0) return props.buttons
  else return [
    { key: 'cancel', title: 'Annuler', value: 'cancel', color: 'grey', variant: 'text' },
    { key: 'ok', title: 'OK', value: 'ok', color: props.level, variant: 'tonal' }
  ]
})

const _icon = computed(() => {
  switch (props.level) {
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
})

const _color = computed(() => {
  return props.level === 'info' ? 'primary' : props.level
})

function close(buttonKey: string | boolean){
  showDialog.value = false
  emit('closeDialog', buttonKey)
}
</script>


<template>
  <VDialog v-model="showDialog" v-bind="dialogOptions">
    <VCard v-bind="cardOptions">
      <VCardTitle class="d-flex align-center"><VIcon :color="_color" class="mr-2">{{_icon}}</VIcon>{{title}}</VCardTitle>
      <VCardText>{{text}}</VCardText>
      <VCardActions>
        <VBtn
          v-for="button in _buttons"
          :key="button.value"
          :color="button.color || _color"
          :variant="button.variant"
          @click="close(button.key)"
        >
          {{button.title}}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss">

</style>