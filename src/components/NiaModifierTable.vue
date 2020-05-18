<template>
  <div class="nia-modifier-table">
    <div class="nia-modifier-table__controls">
      <NiaButton @click.stop="$emit('add-modifier')">+</NiaButton>
      <NiaButton @click.stop="$emit('remove-selected-modifiers')">-</NiaButton>
      <NiaButton>3</NiaButton>
    </div>

    <NiaTable
      class="nia-modifier-table__modifiers"
      :columns="columns"
    >

      <NiaTableRow
        v-for="(modifier, index) in modifiers"
        class="nia-modifier-table__modifiers__modifier"
        :class="modifierRowClasses(modifier)"
        :key="index"
        @click.stop="$emit('toggle-modifier-selection', modifier)"
        @hover="hoverHandler(modifier, $event)"
      >
        <NiaTableRowItem>
          <span
            class="nia-modifier-table__modifiers__modifier__device-id"
          >
            {{ getDeviceName(modifier.getKey().getDeviceId()) }}
          </span>
        </NiaTableRowItem>

        <NiaTableRowItem>
          <span
            class="nia-modifier-table__modifiers__modifier__key-name"
          >
            {{ getModifierName(modifier.getKey().getKeyCode()) }}
          </span>
        </NiaTableRowItem>

        <NiaTableRowItem>
          <span
            class="nia-modifier-table__modifiers__modifier__alias"
          >
            {{ modifier.getAlias() }}
          </span>
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
  import {mapKeyCodeToString, NiaDeviceInfo, NiaModifierDescription} from '@/utils'
  import {NiaTableColumnDefinition} from '@/components/nia/lib'

  @Component({
    name: 'NiaModifierTable',
  })
  export default class NiaModifierTable extends Vue {
    private hoverModifier: NiaModifierDescription | null = null

    @Prop({ required: true })
    modifiers!: Array<NiaModifierDescription>

    @Prop({ required: true })
    selectedModifiers!: Array<NiaModifierDescription>

    get columns(): Array<NiaTableColumnDefinition> {
      return [
        {
          name: 'Device name',
          width: 60,
        },
        {
          name: 'Key',
          width: 20,
        },
        {
          name: 'Alias',
          width: 20,
        },
      ]
    }

    getDeviceName(deviceId: number): string {
      const device: NiaDeviceInfo | null = store.getters.KeymappingModule.getDeviceById(deviceId)

      if (device === null) {
        return ''
      }

      return device.getDeviceName()
    }

    getModifierName(keyCode: number): string {
      return mapKeyCodeToString(keyCode)
    }

    hoverHandler(modifier: NiaModifierDescription, hover: boolean): void {
      if (hover) {
        this.hoverModifier = modifier
      } else {
        this.hoverModifier = null
      }
    }

    modifierRowClasses(modifier: NiaModifierDescription): object {
      for (const selectedModifier of this.selectedModifiers) {
        if (modifier.equals(selectedModifier)) {
          return {
            selected: true,
          }
        }
      }

      return {
        hover: this.hoverModifier === modifier,
      }
    }
  }
</script>

<style scoped>
  .nia-modifier-table__modifiers__modifier__device-id {
    user-select: none;
  }

  .nia-modifier-table__modifiers__modifier__key-name {
    user-select: none; /* Standard */
  }

  .nia-modifier-table__modifiers__modifier__alias {
    user-select: none; /* Standard */
  }
</style>