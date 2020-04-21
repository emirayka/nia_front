<template>
  <div class="settings">
    <NiaAppNavbar @nav="$emit('nav', $event)" />
  </div>
</template>

<script>
  import NiaAppNavbar from '../components/NiaAppNavbar.vue'

  export default {
    name: "Settings",
    components: {
      NiaAppNavbar,
    },
  }
</script>

<style
  scoped
  lang="scss"
>

</style>
