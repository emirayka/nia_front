<template>
  <div class="nia-input-text">
    <input
      v-if="!multiline"
      class="nia-input-text__input"
      type="text"
      :style="inputStyle"
      :value="value"
      :disabled="!enabled"
      @input="inputHandler($event.target.value)"
      @change="changeHandler($event.target.value)"
    >
    <textarea v-else
              class="nia-input-text__textarea"
              :style="inputStyle"
              :value="value"
              :disabled="!enabled"
              @input="inputHandler($event.target.value)"
              @change="changeHandler($event.target.value)"
    >
    </textarea>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import store from '@/store'

  @Component({
    name: 'NiaInputText',
  })
  export default class NiaInputText extends Vue {
    @Prop({required: true})
    value!: string

    @Prop({required: true})
    enabled!: boolean

    @Prop({default: false})
    multiline!: boolean

    get inputStyle(): object {
      if (!this.enabled) {
        return {
          backgroundColor: `${store.getters.Theme.getBackgroundColor3}`,
          color: `${store.getters.Theme.getForegroundColor3}`,
          outline: `${store.getters.Theme.getForegroundColor}`,
          border: `1px solid ${store.getters.Theme.getForegroundColor}`,
        }
      }

      return {
        backgroundColor: `${store.getters.Theme.getBackgroundColor}`,
        color: `${store.getters.Theme.getForegroundColor}`,
        outline: `${store.getters.Theme.getForegroundColorAccent1}`,
        border: `1px solid ${store.getters.Theme.getForegroundColorAccent1}`,
      }
    }

    inputHandler(value: string): void {
      this.$emit('input', value)
    }

    changeHandler(value: string): void {
      this.$emit('change', value)
    }
  }
</script>

<style scoped>
  .nia-input-text {
  }

  .nia-input-text__input {
    box-sizing: border-box;
    display: inline-block;

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

  .nia-input-text__textarea {
    box-sizing: border-box;
    display: inline-block;

    overflow: hidden;

    font-size: 18px;
    font-family: sans-serif;

    background-image: none;

    transition: border-color .25s ease, box-shadow .25s ease;

    border: none;
    border-radius: .25em;
    box-shadow: none;
    outline: none;

    width: 100%;
    height: 100%;
  }
</style>
