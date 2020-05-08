<template>
  <b-nav-item class="nia-nav-item"
    @click.prevent.capture="$emit('nav', path)">
    {{ title }}
  </b-nav-item>
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
    background-color: #777777;
    color: #ffffff;
  }
</style>