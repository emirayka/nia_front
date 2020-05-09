<template>
  <dl
    class="accordion box"
    role="presentation"
  >
    <slot></slot>
  </dl>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import NiaAccordionItem from '@/plugins/nia/NiaAccordionItem.vue'

  @Component({
    name: 'NiaAccordion',
    components: { NiaAccordionItem },
  })
  export default class NiaAccordion extends Vue {
  }
</script>

<style scoped>
  .accordion {
    padding: 0;

    div:not(:last-child) {
      border-bottom: 1px solid rgba(10, 10, 10, 0.1);
    }

    div:last-child .accordion-item-details {
      border-radius: 5px;
    }

    dd {
      margin-left: 0;
    }
  }
</style>
