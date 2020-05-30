<template>
  <NiaDialog>
    <template v-slot:header>
      Waiting...
    </template>

    <template v-slot:body>
      <NiaLoader />
    </template>
  </NiaDialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: 'NiaLoadingDialog',
  })
  export default class NiaLoadingDialog extends Vue {
  }
</script>

<style scoped>
</style>