<template>
  <div class="nia-app-navbar">
    <NiaNavbar>
      <NiaNavbarBrand>
        Nia
      </NiaNavbarBrand>

      <NiaNavbarItem>
        <NiaNavbarNav
          title="Devices"
          path="/Devices"
          @nav="$emit('nav', $event)"
        />
        <NiaNavbarNav
          title="Editor"
          path="/Editor"
          @nav="$emit('nav', $event)"
        />
        <NiaNavbarNav
          title="Terminal"
          path="/Terminal"
          @nav="$emit('nav', $event)"
        />
      </NiaNavbarItem>

      <NiaNavbarItem>
        <NiaListeningButton>
        </NiaListeningButton>
      </NiaNavbarItem>
    </NiaNavbar>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import NiaListeningButton from './NiaListeningButton.vue'

  @Component({
    name: 'NiaAppNavbar',
    components: {
      NiaListeningButton
    },
  })
  export default class NiaAppNavbar extends Vue {
  }
</script>

<style
  scoped
  lang="scss"
>
  .nia-app-navbar {
    background-color: #777777;
    color: #ffffff;
  }
</style>
