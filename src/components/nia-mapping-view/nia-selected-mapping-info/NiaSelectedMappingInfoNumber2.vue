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
      <NiaContainer
        :inline="true"
        :color-level="3"
      >
        <span class="nia-selected-mapping-info-select__property">
          {{ value1Label }}
        </span>

        <NiaInputText
          class="nia-selected-mapping-info-select__value"
          :value="value1String"
          :enabled="selected"
          @input="value1ChangeHandler($event)"
        >
        </NiaInputText>
      </NiaContainer>

      <NiaContainer
        :inline="true"
        :color-level="3"
      >
        <span class="nia-selected-mapping-info-select__property">
          {{ value2Label }}
        </span>

        <NiaInputText
          class="nia-selected-mapping-info-select__value"
          :value="value2String"
          :enabled="selected"
          @input="value2ChangeHandler($event)"
        >
        </NiaInputText>
      </NiaContainer>
    </NiaSelectable>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'NiaSelectedMappingInfoNumber2',
  })
  export default class NiaSelectedMappingInfoNumber2 extends Vue {
    @Prop({ required: true })
    title!: string

    @Prop({ required: true })
    width!: number

    @Prop({ required: true })
    selected!: boolean

    @Prop({ required: true })
    value1!: number

    @Prop({ required: true })
    value2!: number

    @Prop({ required: true })
    value1Label!: string

    @Prop({ required: true })
    value2Label!: string

    get value1String(): string {
      return this.value1.toString()
    }

    get value2String(): string {
      return this.value2.toString()
    }

    get style(): object {
      return {
        width: `${this.width}%`,
      }
    }

    selectedHandler(): void {
      this.$emit('selected')
      this.$emit('updated')
    }

    value1ChangeHandler(value: string): void {
      const integer: number = +value

      if (integer !== integer) {
        return
      }

      this.$emit('value1-changed', integer)
      this.$emit('updated')
    }

    value2ChangeHandler(value: string): void {
      const integer: number = +value

      if (integer !== integer) {
        return
      }

      this.$emit('value2-changed', integer)
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

  .nia-selected-mapping-info-select__property {
    display: inline-block;
    width: 10% !important;
  }

  .nia-selected-mapping-info-select__value {
    display: inline-block;
    width: 90% !important;
  }
</style>
