<template>
  <li
    class="nia-nav-item"
    :style="listItemStyle"
    @click.prevent.capture="$emit('nav', path)"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <a
      class="nia-nav-item__link"
      :style="linkStyle"
    >
      {{ title }}
    </a>
  </li>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import store from '@/store'

  @Component({
    name: "NiaNavItem",
  })
  export default class NiaNavItem extends Vue {
    @Prop({ default: '' })
    title!: string

    @Prop({ default: '' })
    path!: string

    hover = false

    get listItemStyle(): object {
      const backgroundColor: string = this.hover
        ? store.getters.ThemeModule.getBackgroundColorAccent2
        : store.getters.ThemeModule.getBackgroundColor

      return {
        backgroundColor,
      }
    }

    get linkStyle(): object {
      const backgroundColor: string = this.hover
        ? store.getters.ThemeModule.getBackgroundColorAccent2
        : store.getters.ThemeModule.getBackgroundColor

      const color: string = this.hover
        ? store.getters.ThemeModule.getForegroundColorAccent2
        : store.getters.ThemeModule.getForegroundColor

      return {
        backgroundColor,
        color
      }
    }
  }
</script>

<style scoped>
  .nia-nav-item {
    box-sizing: border-box;
    display: inline-block;
    list-style: none;

    margin-left: 5px;
    margin-right: 5px;

    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-size: 1.25em;
    font-weight: 500;
    line-height: 1.5;

    border-radius: 5px;
    padding: 5px;
  }

  .nia-nav-item:hover {
    cursor: pointer;
  }

</style>