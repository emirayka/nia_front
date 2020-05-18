<template>
  <NiaDialog>
    <template v-slot:header>
      Add action
    </template>

    <template v-slot:body>
      <NiaForm
        :form-properties="constructFormProperties()"
        :property-name-percents="30"
        @change="changeHandler($event)"
      />
    </template>

    <template v-slot:footer>
      <NiaDialogFooterButton @click="$emit('add-action')">
        Add
      </NiaDialogFooterButton>

      <NiaDialogFooterButton @click="$emit('cancel')">
        Cancel
      </NiaDialogFooterButton>
    </template>
  </NiaDialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'

  import {
    NiaFormEditEvent,
    NiaFormEvent,
    NiaFormPropertyEvent,
    NiaFormPropertyType,
    NiaFormSelectProperty,
  } from '@/components/nia/lib'
  import {mapKeyCodeToString, NiaDeviceInfo} from '@/utils'

  const PROPERTY_ACTION_NAME = 'Action name'

  @Component({
    name: 'NiaAddActionDialog',
  })
  export default class NiaAddActionDialog extends Vue {
    constructFormProperties() {
      return [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_ACTION_NAME,
          validator: (value: NiaFormEvent) => true,
        } as NiaFormSelectProperty,
      ]
    }

    changeHandler(event: NiaFormPropertyEvent): void {
      switch (event.propertyName) {
        case PROPERTY_ACTION_NAME:
          this.$emit('select-action-name', (event.editEvent as NiaFormEditEvent).value)
          break;
      }
    }
  }
</script>

<style scoped>

</style>
