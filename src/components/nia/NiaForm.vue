<template>
  <div class="nia-form">
    <NiaFormRow
      v-for="(property, index) in formProperties"
      :property="property"
      :property-name-percents="propertyNamePercents"
      :key="index"
      @change="changeHandler(property, $event)"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import {NiaFormEvent, NiaFormProperty, NiaFormPropertyEvent} from './lib'
  import NiaFormRow from './NiaFormRow.vue'

  @Component({
    name: 'NiaForm',
    components: {
      NiaFormRow,
    },
  })
  export default class NiaForm extends Vue {
    @Prop({ required: true })
    formProperties!: Array<NiaFormProperty>

    @Prop({default: 30})
    propertyNamePercents!: number

    changeHandler(property: NiaFormProperty, formEvent: NiaFormEvent): void {
      const formPropertyEvent: NiaFormPropertyEvent = {
        ...formEvent,
        propertyName: property.name
      }

      this.$emit('change', formPropertyEvent)
    }
  }
</script>

<style scoped>
  .nia-form {
    width: 100%;
  }
</style>