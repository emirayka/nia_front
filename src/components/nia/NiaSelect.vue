<template>
  <select
    class="nia-select"
    :style="style"
    :disabled="!enabled"
    @change="changeHandler()"
    ref="select"
  >
    <option
      v-for="(item, index) in items"
      :value="index"
      :selected="index === selectedIndex"
      :key="index"
    >
      {{ item }}
    </option>
  </select>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import store from '@/store'

  @Component({
    name: 'NiaSelect',
  })
  export default class NiaSelect extends Vue {
    @Prop({ required: true })
    items!: Array<string>

    @Prop({ required: true })
    selectedIndex!: number

    @Prop({ default: false })
    enabled!: boolean

    $refs!: {
      select: HTMLSelectElement;
    }

    get style(): object {
      if (!this.enabled) {
        return {
          backgroundColor: store.getters.Theme.getBackgroundColor3,
          color: store.getters.Theme.getForegroundColor3,
          outline: `${store.getters.Theme.getForegroundColorAccent1}`,
          border: `1px solid ${store.getters.Theme.getForegroundColor3}`,
        }
      }

      return {
        backgroundColor: store.getters.Theme.getBackgroundColor,
        color: store.getters.Theme.getForegroundColor,
        outline: `${store.getters.Theme.getForegroundColorAccent1}`,
        border: `1px solid ${store.getters.Theme.getForegroundColorAccent1}`,
      }
    }

    changeHandler(): void {
      this.$emit('selected', this.$refs.select.selectedIndex)
    }
  }
</script>

<style scoped>
  .nia-select {
    box-sizing: border-box;
    display: inline-block;
    width: 100%;

    font-size: 18px;

    border-radius: .25em;
    box-shadow: none;
    outline: none;
    overflow: hidden;
  }
</style>