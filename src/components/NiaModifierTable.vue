<template>
  <div
    class="nia-modifier-table"
    @contextmenu.prevent.stop="modifierTableContextMenuHandler($event)"
  >
    <div class="nia-modifier-table__controls">
      <NiaButton @click.stop="addModifierHandler()">+</NiaButton>
      <NiaButton @click.stop="removeSelectedModifiersHandler()">-</NiaButton>
    </div>

    <NiaScrollBar>
      <NiaTable
        class="nia-modifier-table__modifiers"
        :columns="columns"
      >

        <NiaTableRow
          v-for="(modifier, index) in definedModifiers"
          class="nia-modifier-table__modifiers__modifier"
          :class="modifierRowClasses(modifier)"
          :key="index"
          @click="toggleModifierSelectionHandler(modifier)"
          @contextmenu="modifierRowContextMenuHandler(modifier, $event)"
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
    </NiaScrollBar>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import store from '@/store'
  import {mapKeyCodeToString, NiaDeviceInfo, NiaModifierDescription} from '@/utils'
  import {NiaTableColumnDefinition} from '@/components/nia/lib'

  import loggers from '@/utils/logger'

  const logger = loggers('NiaModifierTable')

  @Component({
    name: 'NiaModifierTable',
  })
  export default class NiaModifierTable extends Vue {
    private hoverModifier: NiaModifierDescription | null = null

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

    get selectedModifiers(): Array<NiaModifierDescription> {
      return store.getters.UI.ModifierTable.selectedModifiers
    }

    get definedModifiers(): Array<NiaModifierDescription> {
      return store.getters.Keymapping.Modifiers.definedModifiers
    }

    getDeviceName(deviceId: number): string {
      const device: NiaDeviceInfo | null = store.getters.Keymapping.DevicesInfo.getDeviceById(deviceId)

      if (device === null) {
        return 'Every device'
      }

      return device.getDeviceName()
    }

    getModifierName(keyCode: number): string {
      return mapKeyCodeToString(keyCode) ?? ''
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
        hover: this.hoverModifier?.equals(modifier) ?? false,
      }
    }

    hoverHandler(modifier: NiaModifierDescription, hover: boolean): void {
      if (hover) {
        this.hoverModifier = modifier
        logger.debug('Hover modifier event. Hovered modifier:')
        logger.debug(this.hoverModifier)
      } else {
        this.hoverModifier = null
        logger.debug('Hover modifier event. No modifier is hovered.')
      }

    }

    toggleModifierSelectionHandler(modifier: NiaModifierDescription): void {
      store.commit.UI.ModifierTable.toggleModifierSelection(modifier)
    }

    modifierRowContextMenuHandler(modifier: NiaModifierDescription, event: MouseEvent): void {
      store.commit.Context.Modifier.setModifier(modifier)
      store.commit.Context.Modifier.setX(event.pageX)
      store.commit.Context.Modifier.setY(event.pageY)
      store.commit.Context.Modifier.show()
    }

    modifierTableContextMenuHandler(event: MouseEvent) {
      store.commit.Context.ModifierTable.setX(event.pageX)
      store.commit.Context.ModifierTable.setY(event.pageY)
      store.commit.Context.ModifierTable.show()
    }

    addModifierHandler(): void {
      store.commit.UI.AddModifierDialog.show()
    }

    removeSelectedModifiersHandler(): void {
      const selectedModifiers: Array<NiaModifierDescription> = this.selectedModifiers

      for (const selectedModifier of selectedModifiers) {
        store.dispatch.Connection.removeModifier({
          deviceId: selectedModifier.getKey().getDeviceId(),
          keyCode: selectedModifier.getKey().getKeyCode(),
        })
      }

      store.commit.UI.ModifierTable.unselectModifiers()
    }
  }
</script>

<style scoped>
  .nia-modifier-table {
    height: 350px;
  }

  .ps {
    height: 300px;
  }

  .nia-table-row.nia-modifier-table__modifiers__modifier.selected {
    background-color: lightgoldenrodyellow !important;
    color: black !important;
  }

  .nia-table-row.nia-modifier-table__modifiers__modifier.hover {
    background-color: #777777 !important;
  }

  .nia-modifier-table__modifiers__modifier__device-id {
    user-select: none;
  }

  .nia-modifier-table__modifiers__modifier__key-name {
    user-select: none;
  }

  .nia-modifier-table__modifiers__modifier__alias {
    user-select: none;
  }
</style>
