<template>
  <span class="nia-label">
    {{ label }}
  </span>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: "NiaLabel",
  })
  export default class NiaLabel extends Vue {
    @Prop({default: ''})
    label!: string
  }
</script>

<style scoped>
  .nia-label {
    display: inline-block;
  }
</style>