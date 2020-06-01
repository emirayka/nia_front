<template>
  <div class="nia-terminal">
    <NiaTerminal>

    </NiaTerminal>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import NiaTerminal from './terminal/NiaTerminal.vue'

  @Component({
    name: 'Terminal',
    components: {
      NiaTerminal
    },
  })
  export default class Terminal extends Vue {
  }
</script>

<style scoped>

</style>