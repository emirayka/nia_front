<template>
  <NiaContainer
    class="nia-selected-mapping-info-empty"
    :inline="true"
    :color-level="3"
  >
    <NiaSelectable
      class="nia-selected-mapping-info-empty__selectable"
      :title="title"
      :selected="selected"
      @selected="selectedHandler()"
    >
      <NiaContainer>
        <slot></slot>
      </NiaContainer>
    </NiaSelectable>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'NiaSelectedMappingInfoEmpty',
  })
  export default class NiaSelectedMappingInfoEmpty extends Vue {
    @Prop({ required: true })
    title!: string

    @Prop({ required: true })
    selected!: boolean

    selectedHandler(): void {
      this.$emit('selected')
      this.$emit('updated')
    }
  }
</script>

<style scoped>
  .nia-selected-mapping-info-empty {
    margin: 15px;
    padding: 5px;
    border-radius: 5px;

    width: 100%;
    height: 100%;
  }

  .nia-selected-mapping-info-empty__selectable {
    width: 100%;
    height: 100%;
  }

</style>
