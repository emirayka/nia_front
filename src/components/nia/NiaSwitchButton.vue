<template>
  <div class="nia-switch-button-control">
    <div
      class="nia-switch-button"
      :class="{ enabled: isEnabled }"
      @click="toggle"
      :style="style"
    >
      <div class="button"></div>
    </div>
    <div class="nia-switch-button-label">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import store from '@/store'

  @Component({
    name: 'NiaSwitchButton',
  })
  export default class NiaSwitchButton extends Vue {
    @Prop({ default: false })
    isEnabled!: boolean

    danger = false
    success = false

    toggle(): void {
      this.$emit("toggle", !this.isEnabled);
    }

    get style(): object {
      const color: string = this.danger
        ? store.getters.Theme.getForegroundColorError1
        : this.success
          ? store.getters.Theme.getForegroundColorSuccess1
          : store.getters.Theme.getForegroundColorAccent1

      return {
        '--color': color,
      }
    }
  }
</script>

<style
  scoped
  lang="scss"
>
  .nia-switch-button-control {
    display: flex;
    flex-direction: row;
    align-items: center;

    .nia-switch-button {
      $switch-button-height: 1.6em;
      $switch-button-color: var(--color);
      $switch-button-border-thickness: 2px;
      $switch-transition: all 0.3s ease-in-out;
      $switch-is-rounded: true;

      height: $switch-button-height;
      width: calc(#{$switch-button-height} * 2);
      border: $switch-button-border-thickness solid $switch-button-color;
      box-shadow: inset 0px 0px $switch-button-border-thickness 0px rgba(0, 0, 0, 0.33);
      border-radius: if($switch-is-rounded, $switch-button-height, 0);

      transition: $switch-transition;

      $button-side-length: calc(
        #{$switch-button-height} - (2 * #{$switch-button-border-thickness})
      );

      cursor: pointer;

      .button {
        height: $button-side-length;
        width: $button-side-length;
        border: $switch-button-border-thickness solid $switch-button-color;
        border-radius: if($switch-is-rounded, $button-side-length, 0);
        background: $switch-button-color;

        transition: $switch-transition;
      }

      &.enabled {
        background-color: $switch-button-color;
        box-shadow: none;

        .button {
          background: white;
          transform: translateX(
              calc(#{$button-side-length} + (2 * #{$switch-button-border-thickness}))
          );
        }
      }
    }

    .switch-button-label {
      margin-left: 10px;
    }
  }
</style>