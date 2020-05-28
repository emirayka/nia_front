<template>
  <NiaContainer
    class="nia-mapping-table"
    @contextmenu="mappingTableContextMenuHandler($event)"
  >
    <NiaContainer>
      <NiaButton @click="showAddMappingDialogHandler()">
        +
      </NiaButton>
      <NiaButton @click="handleRemoveMapping()">
        -
      </NiaButton>
    </NiaContainer>
    <NiaTable :columns="columns">
      <NiaTableRow
        class="nia-mapping-table__row"
        v-for="(mapping, index) in definedMappings"
        :class="mappingRowClasses(mapping, index)"
        @hover="hoverHandler(index, $event)"
        @click="clickHandler(mapping)"
        @contextmenu="mappingRowContextMenuHandler(mapping, $event)"
        :key="index"
      >
        <NiaTableRowItem>
          {{ mapping.stringify() }}
        </NiaTableRowItem>
      </NiaTableRow>
    </NiaTable>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {NiaKeyChord, NiaMapping} from '../../utils/domain/key'

  import store from '@/store'
  import {NiaTableColumnDefinition} from '@/components/nia/lib'

  @Component({
    name: 'NiaMappingTable',
  })
  export default class NiaMappingTable extends Vue {
    hoveredIndex: number | null = null

    get definedMappings(): Array<NiaMapping> {
      return store.getters.Keymapping.Mappings.definedMappings
    }

    get selectedMapping(): NiaMapping | null {
      return store.getters.UI.MappingTable.selectedMapping
    }

    get columns(): Array<NiaTableColumnDefinition> {
      return [
        {
          name: 'Mappings',
          width: 100,
        },
      ]
    }

    mappingRowClasses(mapping: NiaMapping, index: number): object {
      const selectedMapping: NiaMapping | null = this.selectedMapping

      if (selectedMapping !== null && selectedMapping.same(mapping)) {
        return {
          selected: true,
        }
      }

      if (this.hoveredIndex === index) {
        return {
          hover: true,
        }
      }

      return {}
    }

    hoverHandler(index: number, hoverState: boolean): void {
      if (hoverState) {
        this.hoveredIndex = index
      } else {
        this.hoveredIndex = null
      }
    }

    clickHandler(mapping: NiaMapping): void {
      store.commit.UI.MappingTable.selectMapping(mapping)
      store.commit.UI.SelectedMappingInfoView.setCurrentAction(mapping.getAction())
    }

    mappingRowContextMenuHandler(mapping: NiaMapping, event: MouseEvent): void {
      store.commit.Context.Mapping.setX(event.pageX)
      store.commit.Context.Mapping.setY(event.pageY)
      store.commit.Context.Mapping.setMapping(mapping)
      store.commit.Context.Mapping.show()
    }

    mappingTableContextMenuHandler(event: MouseEvent): void {
      store.commit.Context.MappingTable.setX(event.pageX)
      store.commit.Context.MappingTable.setY(event.pageY)
      store.commit.Context.MappingTable.show()
    }

    showAddMappingDialogHandler(): void {
      store.commit.UI.AddMappingDialog.clear()
      store.commit.UI.AddMappingDialog.show()
    }

    handleRemoveMapping(): void {
      const mapping: NiaMapping | null = store.getters.UI.MappingTable.selectedMapping

      if (mapping === null) {
        return
      }

      store.dispatch.Connection.removeMapping({
        keyChords: mapping.getKeyChords(),
      })
    }
  }
</script>

<style scoped>
  .nia-mapping-table {
    width: 100%;
    height: 100%;
  }

  .nia-mapping-table__row {
  }

  .nia-mapping-table__row.selected {
    background-color: lightskyblue !important;
    color: black !important;
  }

  .nia-mapping-table__row.hover {
    background-color: #555555 !important;
  }
</style>