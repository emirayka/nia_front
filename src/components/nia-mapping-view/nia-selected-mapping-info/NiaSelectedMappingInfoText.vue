<template>
  <NiaContainer
    class="nia-selected-mapping-info-text"
    :inline="true"
    :color-level="3"
  >
    <NiaSelectable
      class="nia-selected-mapping-info-text__selectable"
      :title="title"
      :selected="selected"
      @selected="selectedHandler()"
    >
      <NiaInputText
        class="nia-selected-mapping-info-text__selectable__text"
        :multiline="true"
        :enabled="selected"
        :value="value"
        @input="inputHandler($event)"
      />
    </NiaSelectable>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'NiaSelectedMappingInfoCode',
  })
  export default class NiaSelectedMappingInfoCode extends Vue {
    @Prop({ required: true })
    title!: string

    @Prop({ required: true })
    selected!: boolean

    @Prop({ required: true })
    value!: string

    selectedHandler(): void {
      this.$emit('selected')
      this.$emit('updated')
    }

    inputHandler(text: string): void {
      this.$emit('change', text)
      this.$emit('updated')
    }
  }
</script>

<style scoped>
  .nia-selected-mapping-info-text {
    margin: 15px;
    padding: 5px;
    border-radius: 5px;

    width: 100%;
    height: 100%;
  }

  .nia-selected-mapping-info-text__selectable {
    width: 100%;
    height: 100%;
  }

  .nia-selected-mapping-info-text__selectable__text {
    width: 100%;
    height: 100%;
  }

</style>
