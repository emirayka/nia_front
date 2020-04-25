<template>
  <div class="nia-console">
    <NiaConsoleItem
      v-for="(logItem, index) of log"
      :key="index"
      :log-item="logItem"
    />
  </div>
</template>

<script>
  import NiaConsoleItem from './NiaConsoleItem.vue'

  export default {
    name: "NiaConsole",
    components: {
      NiaConsoleItem,
    },
    props: {
      log: {
        type: Array,
        required: true,
      },
    },
  }
</script>

<style scoped>
  .nia-console {
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>