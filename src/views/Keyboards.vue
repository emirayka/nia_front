<template>
  <div class="keyboards">
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
        <NiaKeyboards/>
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
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import NiaKeyboards from '@/components/NiaKeyboards.vue'
  import NiaModifierTable from '@/components/NiaModifierTable.vue'
  import NiaActionTable from '@/components/NiaActionTable.vue'
  import NiaDeviceTable from '@/components/NiaDeviceTable.vue'
  import NiaMappingView from '@/components/NiaMappingView.vue'

  import NiaAddModifierDialog from '@/components/dialogs/NiaAddModifierDialog.vue'
  import NiaAddActionDialog from '@/components/dialogs/NiaAddActionDialog.vue'
  import NiaAddMappingDialog from '@/components/dialogs/NiaAddMappingDialog.vue'

  import store from '@/store'
  import {mapStringToKeyCode} from '@/utils/utils'
  import {
    NiaAction,
    NiaDefineModifierEvent,
    NiaDeviceInfo,
    NiaKey,
    NiaModifierDescription,
  } from '@/utils'

  @Component({
    name: 'Keyboards',
    components: {
      NiaActionTable,
      NiaKeyboards,
      NiaModifierTable,
      NiaDeviceTable,
      NiaAddModifierDialog,
      NiaAddActionDialog,
      NiaAddMappingDialog,
      NiaMappingView,
    },
  })
  export default class Keyboards extends Vue {
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
  .keyboards {
  }

  .nia-grid-layout {
    box-sizing: border-box;
    margin-top: 15px;
    height: 1008px;
  }
</style>
