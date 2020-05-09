<template>
  <NiaButton class="nia-toolbar-item">
    <slot></slot>
  </NiaButton>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {NiaButton} from '@/components/nia'

  @Component({
    name: 'NiaToolbarItem',
    components: {
      NiaButton
    }
  })
  export default class NiaToolbarItem extends Vue {
  }
</script>

<style scoped>
  .nia-toolbar-item {
    margin-left: 5px;
  }
</style>
