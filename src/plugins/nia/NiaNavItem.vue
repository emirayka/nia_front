<template>
  <li class="nia-nav-item"
    @click.prevent.capture="$emit('nav', path)">
    <a>
      {{ title }}
    </a>
  </li>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: "NiaNavItem",
  })
  export default class NiaNavItem extends Vue {
    @Prop({default: ''})
    title!: string

    @Prop({default: ''})
    path!: string
  }
</script>

<style scoped>
  .nia-nav-item {
    display: inline-block;
  }

  .nia-nav-item:hover {
    background-color: #0A0A0A;
    color: #FBFCD4 !important;
  }
</style>