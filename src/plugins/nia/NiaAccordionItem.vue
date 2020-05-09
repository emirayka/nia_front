<template>
  <div :id="id" class="accordion-item" :class="{'is-active': active}">
    <div class="accordion-item-title">
      <button @click="toggle" class="accordion-item-trigger">
        <h4 class="accordion-item-title-text">{{title}}</h4>
        <span class="accordion-item-trigger-icon"></span>
      </button>
    </div>
    <transition
      name="accordion-item"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition">
      <div v-if="active" class="accordion-item-details">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'NiaAccordionItem',
  })
  export default class NiaAccordionItem extends Vue {
    @Prop({default: ''})
    id!: string

    @Prop({default: ''})
    title!: string

    @Prop({default: false})
    multiple = false

    active = false

    toggle(event) {
      if (this.multiple) this.active = !this.active
      else {
        this.$parent.$children.forEach((item: Vue) => {
          const it: NiaAccordionItem = item as NiaAccordionItem

          if (it.$el.id === event.currentTarget.parentElement.parentElement.id) it.active = !it.active
          else it.active = false
        })
      }
    }

    startTransition(el: HTMLDivElement) {
      el.style.height = `${el.scrollHeight}px`
    }

    endTransition(el: HTMLDivElement) {
      el.style.height = ''
    }
  }
</script>

<style scoped>
  .accordion-item-trigger,
  .accordion-item-details-inner {
    padding: 0.75rem 1.25rem;
  }

  .accordion-item-title {
    position: relative;

    h4 {
      font-size: 1.25rem;
      margin-bottom: 0;
      padding-right: 1.25rem;
    }
  }

  .accordion-item-trigger {
    width: 100%;
    text-align: left;
    background-color: transparent;
    border: none;
  }

  .accordion-item-trigger-icon {
  $size: 8px;
    display: block;
    position: absolute;
    top: 0; right: 1.25rem; bottom: 0;
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
    background-color: whitesmoke;
  }

  .accordion-item-enter-active, .accordion-item-leave-active {
    will-change: height;
    transition: height 0.2s ease;
  }
  .accordion-item-enter, .accordion-item-leave-to {
    height: 0 !important;
  }
</style>
