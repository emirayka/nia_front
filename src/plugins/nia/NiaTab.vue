<template>
  <b-tab
    class="nia-tab"
    :title="title"
  >
    <slot></slot>
  </b-tab>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: "NiaTab",
  })
  export default class NiaTab extends Vue {
    @Prop({ default: '' })
    title!: string
  }
</script>

<style scoped>
  .nia-tab {
    background-color: #777777;
    color: #ffffff;
  }
</style>