<template>
  <div class="nia-form-row-edit">
    <label class="nia-form-row-edit__label">
        <span
          class="nia-form-row-edit__label__property-name"
          :style="propertyNameStyle"
        >
          {{ propertyName }}
        </span>

      <input
        class="nia-form-row-edit__label__input"
        :style="inputStyle"
        type="text"
        ref="inputElement"
        @input.stop="changeHandler($event.target.value)"
      >
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import {NiaFormEditEvent, NiaFormEditProperty} from './lib'

  import store from '@/store'

  @Component({
    name: 'NiaFormRowEdit',
  })
  export default class NiaFormRowEdit extends Vue {
    @Prop({ required: true })
    editProperty!: NiaFormEditProperty

    @Prop({ default: 30 })
    propertyNamePercents!: number

    $refs!: {
      inputElement: HTMLInputElement;
    }

    get propertyNameStyle(): object {
      return {
        width: `${this.propertyNamePercents}%`
      }
    }

    get inputStyle(): object {
      return {
        width: `${(100 - this.propertyNamePercents)}%`,
        backgroundColor: `${store.getters.ThemeModule.getBackgroundColor}`,
        color: `${store.getters.ThemeModule.getForegroundColor}`,
        outline: `${store.getters.ThemeModule.getForegroundColorAccent1}`,
        border: `1px solid ${store.getters.ThemeModule.getForegroundColorAccent1}`,
      }
    }

    get propertyName(): string {
      return this.editProperty.name
    }

    changeHandler(value: string): void {
      const editEvent: NiaFormEditEvent = {
        value,
      }

      this.$emit('change', editEvent)
    }

    mounted(): void {
      this.changeHandler(this.$refs.inputElement.value)
    }
  }
</script>

<style scoped>
  .nia-form-row-edit {
  }

  .nia-form-row-edit__label {
  }

  .nia-form-row-edit__label__property-name {
    box-sizing: border-box;
    display: inline-block;
    margin: 0;
    padding: 0;
    font-size: 18px;
  }

  .nia-form-row-edit__label__input {
    box-sizing: border-box;
    display: inline-block;

    /*padding: 5px 10px;*/

    overflow: hidden;

    font-size: 18px;
    font-family: sans-serif;

    background-image: none;

    transition: border-color .25s ease, box-shadow .25s ease;

    border: none;
    border-radius: .25em;
    box-shadow: none;
    outline: none;
  }
</style>
