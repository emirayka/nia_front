<template>
  <div class="nia-tab"
       v-show="isActive">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: "NiaTab",
  })
  export default class NiaTab extends Vue {
    isActive = false

    @Prop({ default: '' })
    title!: string

    @Prop({default: false})
    selected!: boolean

    get href(): string {
      return '#' + this.title.toLowerCase().replace(/ /g, '-');
    }

    mounted() {
      this.isActive = this.selected;
    }
  }
</script>

<style scoped>
  .nia-tab {
    background-color: #777777;
    color: #ffffff;
  }
</style>