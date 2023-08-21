<script setup lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { VBottomSheet } from 'vuetify/labs/VBottomSheet'
import Card from './Card.vue'
import { VCard, VCardTitle, VCardText, VList, VListItem } from 'vuetify/lib/components/index.mjs'

const props = defineProps({
  bottomSheetOptions: {
    type: Object,
    default: () => ({})
  },
  items: {
    type: Array as () => any[],
    required: false
  },
  title: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  }
})

// ------- EVENTS -------
const emit = defineEmits(['closeBottomSheet'])

// ------- DATA -------
let showBottomSheet = ref(true)

// ------- COMPUTED -------
const _items = computed(() => {
  if(props.items && props.items.length > 0) return props.items;
  else return []
})

// ------- WATCH -------
watch(() => showBottomSheet, (val) => {
  if(!val) emit('closeBottomSheet')
})

// ------- METHODS -------
function close(value: string | boolean){
  showBottomSheet.value = false
  emit('closeBottomSheet', value)
}

</script>

<template>

  <VBottomSheet
    v-bind="bottomSheetOptions"
    v-model="showBottomSheet"
  >

    <VCard v-if="!bottomSheetOptions.dialogOptions">
      <VCardTitle v-if="title">{{title}}</VCardTitle>
      <VCardText v-if="text">{{ text }}</VCardText>
      <VList v-if="items">
        <VListItem v-for="item in _items" :key="item.value">
          {{ item.title }}
        </VListItem>
      </VList>
    </VCard>

    <Card
      v-else
      v-bind="bottomSheetOptions.dialogOptions"
      :title="bottomSheetOptions.dialogOptions.title"
      :text="bottomSheetOptions.dialogOptions.text"
      @buttonClicked="close"
    />
  </VBottomSheet>
  
</template>
