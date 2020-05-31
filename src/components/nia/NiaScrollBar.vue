<template>
  <perfect-scrollbar>
    <div ref="scrolled">
      <slot></slot>
    </div>
  </perfect-scrollbar>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import store from '@/store'

  type MutationCallback = () => void

  @Component({
    name: 'NiaScrollBar',
  })
  export default class NiaScrollBar extends Vue {
    callback: MutationCallback | null = null
    observer: MutationObserver | null = null

    $refs!: {
      scrolled: HTMLDivElement;
    }

    @Prop({ default: false })
    autoScroll!: boolean

    mounted(): void {
      if (this.autoScroll) {
        this.callback = () => {
          const container = this.$refs.scrolled.parentElement

          container.scrollTop = container.scrollHeight;
        }

        this.observer = new MutationObserver(this.callback)

        this.observer?.observe(this.$refs.scrolled, {
          childList: true,
        })
      }
    }

    destroyed(): void {
      this.observer?.disconnect()
    }
  }
</script>

<style scoped>
  .nia-scroll-bar {
    height: 100%;
    overflow: scroll;
  }

  .nia-scroll-bar::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #111111;
  }

  .nia-scroll-bar::-webkit-scrollbar {
    width: 12px;
    background-color: gold;
  }

  .nia-scroll-bar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: gold;
  }

</style>
