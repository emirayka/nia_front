<template>
  <div class="devices">
    <NiaGridLayout
      :column-number="100"
      :row-number="100"
      :margin="[10, 10]"
    >

      <NiaGridItem
        :x="1"
        :y="1"
        :w="30"
        :h="100"
      >
        <NiaAccordion>
          <NiaAccordionItem
            :id="'110'"
            :title="'Devices'"
            :multiple="false"
          >
            <NiaDeviceTable />
          </NiaAccordionItem>

          <NiaAccordionItem
            :id="'111'"
            :title="'Modifiers'"
            :multiple="false"
          >
            <NiaModifierTable/>
          </NiaAccordionItem>
          <NiaAccordionItem
            :id="'112'"
            :title="'Actions'"
            :multiple="false"
          >
            <NiaActionTable />
          </NiaAccordionItem>
        </NiaAccordion>
      </NiaGridItem>

      <NiaGridItem
        :x="31"
        :y="1"
        :w="70"
        :h="60"
      >
        <NiaDevices/>
      </NiaGridItem>

      <NiaGridItem
        :x="31"
        :y="61"
        :w="70"
        :h="40"
      >
        <NiaMappingView />
      </NiaGridItem>
    </NiaGridLayout>

    <NiaAddModifierDialog v-if="addModifierDialogIsShown"/>
    <NiaAddActionDialog v-if="addActionDialogIsShown" />
    <NiaAddMappingDialog v-if="addMappingDialogIsShown" />

    <NiaActionContextMenu />
    <NiaActionTableContextMenu />
    <NiaKeyContextMenu />
    <NiaDeviceContextMenu />
    <NiaMappingContextMenu />
    <NiaMappingTableContextMenu />
    <NiaModifierContextMenu />
    <NiaModifierTableContextMenu />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import NiaDevices from '@/components/NiaDevices.vue'
  import NiaModifierTable from '@/components/NiaModifierTable.vue'
  import NiaActionTable from '@/components/NiaActionTable.vue'
  import NiaDeviceTable from '@/components/NiaDeviceTable.vue'
  import NiaMappingView from '@/components/NiaMappingView.vue'

  import NiaAddModifierDialog from '@/components/dialogs/NiaAddModifierDialog.vue'
  import NiaAddActionDialog from '@/components/dialogs/NiaAddActionDialog.vue'
  import NiaAddMappingDialog from '@/components/dialogs/NiaAddMappingDialog.vue'

  import NiaKeyContextMenu from '@/components/contexts/NiaKeyContextMenu.vue'
  import NiaDeviceContextMenu from '@/components/contexts/NiaDeviceContextMenu.vue'
  import NiaMappingContextMenu from '@/components/contexts/NiaMappingContextMenu.vue'
  import NiaMappingTableContextMenu from '@/components/contexts/NiaMappingTableContextMenu.vue'
  import NiaModifierContextMenu from '@/components/contexts/NiaModifierContextMenu.vue'
  import NiaModifierTableContextMenu from '@/components/contexts/NiaModifierTableContextMenu.vue'
  import NiaActionContextMenu from '@/components/contexts/NiaActionContextMenu.vue'
  import NiaActionTableContextMenu from '@/components/contexts/NiaActionTableContextMenu.vue'

  import store from '@/store'

  @Component({
    name: 'Devices',
    components: {
      NiaActionTable,
      NiaDevices,
      NiaModifierTable,
      NiaDeviceTable,

      NiaAddModifierDialog,
      NiaAddActionDialog,
      NiaAddMappingDialog,
      NiaMappingView,

      NiaKeyContextMenu,
      NiaDeviceContextMenu,
      NiaMappingContextMenu,
      NiaMappingTableContextMenu,
      NiaModifierContextMenu,
      NiaModifierTableContextMenu,
      NiaActionContextMenu,
      NiaActionTableContextMenu,
    },
  })
  export default class Devices extends Vue {
    get addModifierDialogIsShown(): boolean {
      return store.getters.UI.AddModifierDialog.isShown
    }
    get addActionDialogIsShown(): boolean {
      return store.getters.UI.AddActionDialog.isShown
    }
    get addMappingDialogIsShown(): boolean {
      return store.getters.UI.AddMappingDialog.isShown
    }
  }
</script>

<style
  scoped
  lang="scss"
>
  .devices {
  }

  .nia-grid-layout {
    box-sizing: border-box;
    margin-top: 15px;
    height: 1008px;
  }
</style>
