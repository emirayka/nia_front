<template>
  <div
    :id="id"
    class="accordion-item"
    :class="{'is-active': active}"
    :style="accordionItemStyle"
  >
    <div class="accordion-item-title">
      <button
        @click="toggleCollapse"
        class="accordion-item-trigger"
        :style="accordionItemTriggerStyle"
      >
        <span
          class="accordion-item-title-text"
          :style="accordionItemTitleTextStyle"
        >
          {{title}}</span>
        <span
          class="accordion-item-trigger-icon"
          :style="accordionItemTriggerIconStyle"
        ></span>
      </button>
    </div>
    <transition
      name="accordion-item"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition"
    >
      <div
        v-if="active"
        class="accordion-item-details"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import store from '@/store'

  @Component({
    name: 'NiaAccordionItem',
  })
  export default class NiaAccordionItem extends Vue {
    @Prop({ default: '' })
    id!: string

    @Prop({ default: '' })
    title!: string

    active = false

    toggleCollapse(event: MouseEvent): void {
      if (event.currentTarget === null) {
        return
      }

      const parent: HTMLElement = event.currentTarget as HTMLElement

      if (parent.parentElement === null) {
        return
      }

      const parent2: HTMLElement = parent.parentElement as HTMLElement

      if (parent2.parentElement === null) {
        return
      }

      const parent3: HTMLElement = parent2.parentElement as HTMLElement

      this.$parent.$children.forEach((item: Vue) => {
        const it: NiaAccordionItem = item as NiaAccordionItem

        if (it.$el.id === parent3.id) {
          it.active = !it.active
        } else it.active = false
      })
    }

    startTransition(el: HTMLDivElement) {
      el.style.height = `${el.scrollHeight}px`
    }

    endTransition(el: HTMLDivElement) {
      el.style.height = ''
    }

    get accordionItemStyle(): object {
      return {
        backgroundColor: store.getters.Theme.getBackgroundColor,
        color: store.getters.Theme.getForegroundColor,
      }
    }

    get accordionItemTriggerStyle(): object {
      return {
        backgroundColor: store.getters.Theme.getBackgroundColor,
        color: store.getters.Theme.getForegroundColor,
      }
    }

    get accordionItemTitleTextStyle(): object {
      return {
        backgroundColor: store.getters.Theme.getBackgroundColor,
        color: store.getters.Theme.getForegroundColor,
      }
    }

    get accordionItemTriggerIconStyle(): object {
      return {
        backgroundColor: store.getters.Theme.getBackgroundColorAccent2,
      }
    }
  }
</script>

<style
  scoped
  lang="scss"
>
  .accordion-item-trigger,
  .accordion-item-details-inner {
    padding: 0.75rem 1.25rem;
  }

  .accordion-item-title {
    position: relative;
  }

  .accordion-item-title-text {
    font-size: 1.25rem;
    margin-bottom: 0;
    padding-right: 1.25rem;
  }

  .accordion-item-trigger {
    width: 100%;
    text-align: left;
    background-color: transparent;
    border: none;
    outline: none;
  }

  .accordion-item-trigger-icon {
    $size: 8px;
    display: block;
    position: absolute;
    top: 0;
    right: 1.25rem;
    bottom: 0;
    margin: auto;
    width: $size;
    height: $size;
    border-right: 2px solid #363636;
    border-bottom: 2px solid #363636;
    transform: translateY(-$size / 4) rotate(45deg);
    transition: transform 0.2s ease;

    .is-active & {
      transform: translateY($size / 4) rotate(225deg);
    }
  }

  .accordion-item-details {
    overflow: hidden;
  }

  .accordion-item-enter-active, .accordion-item-leave-active {
    will-change: height;
    transition: height 0.2s ease;
  }

  .accordion-item-enter, .accordion-item-leave-to {
    height: 0 !important;
  }
</style>
