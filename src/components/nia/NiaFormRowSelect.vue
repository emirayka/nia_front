<template>
  <div class="nia-form-row-select">
    <label class="nia-form-row-select__label">
      <span
        class="nia-form-row-select__label__property-name"
        :style="propertyNameStyle"
      >
        {{ propertyName }}
      </span>

      <select
        class="nia-form-row-select__label__select"
        :style="selectStyle"
        @input="changeHandler()"
        ref="selectElement"
      >
        <option disabled></option>
        <option
          v-for="(selectValue, index) in selectValues"
          :key="index"
        >
          {{ selectValue }}
        </option>
      </select>
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import {NiaFormSelectEvent, NiaFormSelectProperty} from '@/components/nia/lib'

  import store from '@/store'

  @Component({
    name: 'NiaFormRowSelect',
  })
  export default class NiaFormRowSelect extends Vue {
    @Prop({ required: true })
    selectProperty!: NiaFormSelectProperty

    @Prop({ default: 30 })
    propertyNamePercents!: number

    $refs!: {
      selectElement: HTMLSelectElement;
    }

    get propertyNameStyle(): object {
      return {
        width: `${this.propertyNamePercents}%`,
      }
    }

    get selectStyle(): object {
      return {
        width: `${(100 - this.propertyNamePercents)}%`,
        backgroundColor: store.getters.Theme.getBackgroundColor,
        color: store.getters.Theme.getForegroundColor,
        outline: `${store.getters.Theme.getForegroundColorAccent1}`,
        border: `1px solid ${store.getters.Theme.getForegroundColorAccent1}`,
      }
    }

    get propertyName(): string {
      return this.selectProperty.name
    }

    get selectValues(): Array<string> {
      return this.selectProperty.selectValues
    }

    changeHandler(): void {
      const selectedIndex: number = this.$refs.selectElement.selectedIndex - 1

      const selectEvent: NiaFormSelectEvent = {
        index: selectedIndex,
        value: this.selectProperty.selectValues[selectedIndex],
      }

      this.$emit('change', selectEvent)
    }

    mounted(): void {
      this.changeHandler()
    }
  }
</script>

<style
  scoped
  lang="scss"
>
  .nia-form-row-select {
  }

  .nia-form-row-select__label {
  }

  .nia-form-row-select__label__property-name {
    box-sizing: border-box;
    display: inline-block;
    font-size: 18px;

    margin: 0;
    padding: 0;
  }

  .nia-form-row-select__label__select {
    box-sizing: border-box;
    display: inline-block;
    font-size: 18px;

    border-radius: .25em;
    box-shadow: none;
    outline: none;
    overflow: hidden;
  }
</style>
