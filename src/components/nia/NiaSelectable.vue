<template>
  <NiaContainer class="nia-selectable">
    <label class="nia-selectable__selector">
      <input
        type="radio"
        :checked="selected"
        @change="changeHandler"
        ref="radio"
      >
      {{ title }}
    </label>

    <div class="nia-selectable__content">
      <slot></slot>
    </div>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import NiaContainer from './NiaContainer.vue'

  @Component({
    name: 'NiaSelectable',
    components: {
      NiaContainer,
    },
  })
  export default class NiaSelectable extends Vue {
    @Prop({ default: '' })
    title!: string

    @Prop({ default: false })
    selected!: boolean

    $refs!: {
      radio: HTMLInputElement;
    }

    changeHandler(): void {
      if (this.$refs.radio.checked) {
        this.$emit('selected')
      }
    }
  }
</script>

<style scoped>
  .nia-selectable {
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    height: 100%;

    font-size: 18px;

    border-radius: .25em;
    box-shadow: none;
    outline: none;
    overflow: hidden;
  }

  .nia-selectable__selector {
    box-sizing: border-box;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .nia-selectable__content {
    box-sizing: border-box;
    width: 100%;
    height: 90%;
    margin: 0;
    padding: 10px;
  }
</style>
