<template>
  <b-tab
    class="nia-tab"
    :title="title"
  >
    <slot></slot>
  </b-tab>
</template>

<script>
  export default {
    name: "NiaTab",
    props: {
      title: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style scoped>
  .nia-tab {
    background-color: #777777;
    color: #ffffff;
  }
</style>