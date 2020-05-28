<template>
  <div class="nia-form-row">
    <NiaFormRowEdit
      v-if="isEditProperty"
      :edit-property="property"
      :property-name-percents="propertyNamePercents"
      @change="editChangeHandler($event)"
    />

    <NiaFormRowSelect
      v-if="isSelectProperty"
      :select-property="property"
      :property-name-percents="propertyNamePercents"
      @change="selectChangeHandler($event)"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import {
    NiaFormEditEvent,
    NiaFormEvent,
    NiaFormEventType,
    NiaFormProperty,
    NiaFormPropertyType,
    NiaFormSelectEvent,
  } from './lib'
  import NiaFormRowEdit from './NiaFormRowEdit.vue'
  import NiaFormRowSelect from './NiaFormRowSelect.vue'

  @Component({
    name: 'NiaFormRow',
    components: {
      NiaFormRowEdit,
      NiaFormRowSelect,
    },
  })
  export default class NiaFormRow extends Vue {
    editValue = ''
    selectedIndex = 0
    success: boolean | null = null

    @Prop({ required: true })
    property!: NiaFormProperty

    @Prop({ default: 30 })
    propertyNamePercents!: number

    get isEditProperty(): boolean {
      return this.property.type === NiaFormPropertyType.Edit
    }

    get isSelectProperty(): boolean {
      return this.property.type === NiaFormPropertyType.Select
    }

    editChangeHandler(editEvent: NiaFormEditEvent): void {
      this.editValue = editEvent.value

      const event: NiaFormEvent = {
        eventType: NiaFormEventType.Edit,
        editEvent
      }

      this.success = this.property.validator(event)

      if (this.success) {
        this.$emit('change', event)
      }
    }

    selectChangeHandler(selectEvent: NiaFormSelectEvent): void {
      this.selectedIndex = selectEvent.index

      const event: NiaFormEvent = {
        eventType: NiaFormEventType.Select,
        selectEvent
      }

      this.success = this.property.validator(event)

      if (this.success) {
        this.$emit('change', event)
      }
    }
  }
</script>

<style scoped>
  .nia-form-row {
    margin-top: 5px;
  }
</style>