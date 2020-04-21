<template>
  <b-nav-item class="nia-nav-item"
    @click.prevent.capture="$emit('nav', path)">
    {{ title }}
  </b-nav-item>
</template>

<script>
  export default {
    name: "NiaNavItem",
    props: {
      title: {
        type: String,
        default: '',
      },
      path: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style scoped>
  .nia-nav-item {
    background-color: #777777;
    color: #ffffff;
  }
</style>