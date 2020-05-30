<template>
  <div class="nia-scroll-bar">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import store from '@/store'

  @Component({
    name: 'NiaScrollBar',
  })
  export default class NiaSelect extends Vue {
  }
</script>

<style scoped>
  .nia-scroll-bar {
  }

  .nia-scroll-bar::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #111111;
  }

  .nia-scroll-bar::-webkit-scrollbar
  {
    width: 12px;
    background-color: gold;
  }

  .nia-scroll-bar::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: gold;
  }

</style>
