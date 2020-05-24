<template>
  <NiaContainer
    class="nia-selected-mapping-info-select"
    :style="style"
    :inline="true"
    :color-level="3"
  >
    <NiaSelectable
      :title="title"
      :selected="selected"
      @selected="selectedHandler()"
    >
      <NiaSelect :items="items"
                 :selected-index="selectedIndex"
                 :enabled="selected"
                 @selected="selectedIndexHandler($event)">
      </NiaSelect>
    </NiaSelectable>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'NiaSelectedMappingInfoSelect'
  })
  export default class NiaSelectedMappingInfoSelect extends Vue {
    @Prop({required: true})
    title!: string

    @Prop({required: true})
    width!: number

    @Prop({required: true})
    items!: Array<string>

    @Prop({required: true})
    selected!: boolean

    @Prop({required: true})
    selectedIndex!: number

    get style(): object {
      return {
        width: `${this.width}%`
      }
    }

    selectedHandler(): void {
      this.$emit('selected')
      this.$emit('updated')
    }

    selectedIndexHandler(event: number): void {
      this.$emit('selected-index', event)
      this.$emit('updated')
    }
  }
</script>

<style scoped>
  .nia-selected-mapping-info-select {
    margin: 15px 5px 5px 5px;
    padding: 5px;
    border-radius: 5px;
  }
</style>