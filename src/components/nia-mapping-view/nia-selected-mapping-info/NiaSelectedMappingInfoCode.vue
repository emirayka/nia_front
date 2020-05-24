<template>
  <NiaContainer
    class="nia-selected-mapping-info-code"
    :inline="true"
    :color-level="3"
  >
    <NiaSelectable
      class="nia-selected-mapping-info-code__selectable"
      :title="title"
      :selected="selected"
      @selected="selectedHandler()"
    >
      <NiaCodeEditor
        class="nia-selected-mapping-info-code__selectable__code"
        :enabled="selected"
        :code="value"
        @change="changeHandler($event)"
      >

      </NiaCodeEditor>
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

    changeHandler(code: string): void {
      this.$emit('change', code)
      this.$emit('updated')
    }
  }
</script>

<style scoped>
  .nia-selected-mapping-info-code {
    margin: 15px;
    padding: 5px;
    border-radius: 5px;

    width: 100%;
    height: 100%;
  }

  .nia-selected-mapping-info-code__selectable {
    width: 100%;
    height: 100%;
  }

  .nia-selected-mapping-info-code__selectable__code {
    width: 100%;
    height: 100%;
  }

</style>
