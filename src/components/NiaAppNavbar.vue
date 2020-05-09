<template>
  <div class="nia-app-navbar">
    <NiaNavbar>
      <NiaNavbarBrand>
        Nia
      </NiaNavbarBrand>

      <NiaNavbarNav>
        <NiaNavItem
          title="Keyboards"
          path="/Keyboards"
          @nav="$emit('nav', $event)"
        />
        <NiaNavItem
          title="Editor"
          path="/Editor"
          @nav="$emit('nav', $event)"
        />
        <NiaNavItem
          title="Settings"
          path="/Settings"
          @nav="$emit('nav', $event)"
        />
      </NiaNavbarNav>
    </NiaNavbar>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: 'NiaAppNavbar',
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
