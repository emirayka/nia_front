<template>
  <div class="nia-tab" v-if="selected">
    <slot>
    </slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: "NiaTab.ts",
  })
  export default class NiaTab extends Vue {
    @Prop({ default: '' })
    title!: string

    @Prop({ default: false })
    selected!: boolean

    get href(): string {
      return '#' + this.title.toLowerCase().replace(/ /g, '-');
    }
  }
</script>

<style scoped>
  .nia-tab {
    background-color: #777777;
    color: #ffffff;

  }
</style>
