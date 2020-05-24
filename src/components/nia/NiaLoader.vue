<template>
  <div>
    <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: 'NiaLoader',
  })
  export default class NiaLoader extends Vue {
  }
</script>

<style scoped lang="scss">
  // Here is where the magic happens
  $offset: 187;
  $duration: 1.4s;

  .spinner {
    animation: rotator $duration linear infinite;
  }

  @keyframes rotator {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(270deg); }
  }

  .path {
    stroke-dasharray: $offset;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation:
    dash $duration ease-in-out infinite,
    colors ($duration*4) ease-in-out infinite;
  }

  @keyframes colors {
    0% { stroke: #800080; }
    25% { stroke: #777777; }
    50% { stroke: #F7C223; }
    75% { stroke: #777777; }
    100% { stroke: #800080; }
  }

  @keyframes dash {
    0% { stroke-dashoffset: $offset; }
    50% {
      stroke-dashoffset: $offset/4;
      transform:rotate(135deg);
    }
    100% {
      stroke-dashoffset: $offset;
      transform:rotate(450deg);
    }
  }
</style>