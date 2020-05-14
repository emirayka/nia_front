<template>
  <div class="nia-modifier-table">
    <div class="nia-modifier-table__controls">
      <NiaButton @click.stop="addModifierHandler($event)">+</NiaButton>
      <NiaButton @click.stop="removeModifierHandler($event)">-</NiaButton>
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
          Alias
        </NiaTableRowItem>
      </NiaTableHeaderRow>

      <NiaTableRow
        v-for="(modifier, index) in modifiers"
        :key="index"
        @click.stop="selectModifierHandler(modifier)"
      >
        <NiaTableRowItem>
          {{ getKeyboardName(modifier.keyboardKey.keyboardPath) }}
        </NiaTableRowItem>

        <NiaTableRowItem>
          {{ modifier.keyboardKey.keyCode }}
        </NiaTableRowItem>

        <NiaTableRowItem>
          {{ modifier.modifierAlias }}
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
  import {
    Modifier,
    DeviceInfo
  } from '@/store/models'

  @Component({
    name: 'NiaModifierTable',
  })
  export default class NiaModifierTable extends Vue {
    @Prop({ required: true })
    modifiers!: Array<Modifier>

    getKeyboardName(keyboardPath: string): string {
      const device: DeviceInfo | null = store.getters.KeymappingModule.getKeyboardByPath(keyboardPath)

      if (device === null) {
        return ''
      }

      return device.name
    }

    addModifierHandler(event: MouseEvent): void {
      this.$emit('add-modifier')
    }

    removeModifierHandler(event: MouseEvent): void {
      this.$emit('remove-modifier')
    }

    selectModifierHandler(modifier: Modifier): void {
      console.log('selected')
      this.$emit('select-modifier', modifier)
    }
  }
</script>

<style scoped>

</style>