<template>
  <div class="settings">
    <NiaAppNavbar @nav="$emit('nav', $event)" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import NiaAppNavbar from '../components/NiaAppNavbar.vue'

  @Component({
    name: "Settings",
    components: {
      NiaAppNavbar,
    },
  })
  export default class Settings extends Vue {
  }
</script>

<style
  scoped
  lang="scss"
>

</style>
