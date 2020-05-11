<template>
  <div class="nia-modifier-table">
    <div class="nia-modifier-table__controls">
      <NiaButton @click="addModifierHandler($event)">+</NiaButton>
      <NiaButton>2</NiaButton>
      <NiaButton>3</NiaButton>
    </div>

    <NiaTable class="nia-modifier-table__modifiers">
      <NiaTableHeaderRow>
        <NiaTableRowItem>
          Keyboard name
        </NiaTableRowItem>
        <NiaTableRowItem>
          Key code
        </NiaTableRowItem>
        <NiaTableRowItem>
          Binding
        </NiaTableRowItem>
      </NiaTableHeaderRow>

      <NiaTableRow
        v-for="(modifier, index) in modifiers"
        :key="index"
      >
        <NiaTableRowItem>
          {{ getKeyboardName(modifier.keyboardPath) }}
        </NiaTableRowItem>

        <NiaTableRowItem>
          {{ modifier.keyCode }}
        </NiaTableRowItem>

        <NiaTableRowItem>
          {{ 'unimplemented' }}
        </NiaTableRowItem>
      </NiaTableRow>
    </NiaTable>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import store from '@/store'
  import KeyboardKey from '@/store/models/keyboard-key'

  @Component({
    name: 'NiaModifierTable',
  })
  export default class NiaModifierTable extends Vue {
    @Prop({ required: true })
    modifiers: Array<KeyboardKey> = []

    getKeyboardName(keyboardPath: string): string {
      return store.getters.KeymappingModule.getKeyboardByPath()(keyboardPath)
    }

    addModifierHandler(event: MouseEvent): void {
      this.$emit('add-modifier')
    }
  }
</script>

<style scoped>

</style>