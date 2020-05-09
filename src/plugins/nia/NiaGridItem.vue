<template>
  <div
    class="nia-grid-item"
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'NiaGridItem',
  })
  export default class NiaGridItem extends Vue {
    @Prop({ required: true })
    x!: number

    @Prop({ required: true })
    y!: number

    @Prop({ required: true })
    w!: number

    @Prop({ required: true })
    h!: number

    get style(): object {
      return {
        gridColumnStart: this.x,
        gridRowStart: this.y,
        gridColumnEnd: this.x + this.w,
        gridRowEnd: this.y + this.h,
      }
    }
  }
</script>

<style scoped>
  .nia-grid-item {
    padding: 10px;
  }
</style>