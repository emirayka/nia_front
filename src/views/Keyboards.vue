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
            :id="'111'"
            :title="'Modifiers'"
            :multiple="false"
          >
            <NiaModifierTable
              :modifiers="getDefinedModifiers"
              :selected-modifiers="getSelectedModifiers"
              @toggle-modifier-selection="toggleModifierSelection($event)"
              @add-modifier="showAddModifierDialogHandler()"
              @remove-selected-modifiers="removeSelectedModifiersHandler()"
            />
          </NiaAccordionItem>
          <NiaAccordionItem
            :id="'112'"
            :title="'Actions'"
            :multiple="false"
          >
            <NiaActionTable />
          </NiaAccordionItem>
          <NiaAccordionItem
            :id="'113'"
            :title="'title-3'"
            :multiple="false"
          >
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolor dolore, ducimus exercitationem
              facilis fugiat, harum, in ipsam iure laudantium officia officiis optio quod rem suscipit veniam veritatis
              voluptas voluptates.
            </div>
          </NiaAccordionItem>
        </NiaAccordion>
      </NiaGridItem>

      <NiaGridItem
        :x="31"
        :y="1"
        :w="70"
        :h="60"
      >
        <NiaKeyboards
          :devices-info="getDevicesInfo"
          :selected-keys="getSelectedKeys"
          :modifiers="getDefinedModifiers"
          @define-keyboard="$emit('define-keyboard', $event)"
          @remove-keyboard="$emit('remove-keyboard', $event)"
          @click-keyboard="clickKeyboardHandler($event)"
          @click-key="clickKeyHandler($event)"
        />
      </NiaGridItem>

      <NiaGridItem
        :x="31"
        :y="61"
        :w="70"
        :h="40"
      >
        <NiaColoredDiv>
          3
        </NiaColoredDiv>
      </NiaGridItem>
    </NiaGridLayout>

    <NiaAddModifierDialog
      v-if="addModifierDialogIsShown"
      @add-modifier="addModifierDialogAddModifierHandler"
      @cancel="addModifierDialogCancelHandler"
      @select-keyboard="addModifierDialogSelectKeyboardHandler($event)"
      @select-key-code="addModifierDialogSelectKeyCodeHandler($event)"
      @select-modifier-alias="addModifierDialogSelectModifierAliasHandler($event)"
    />

    <NiaAddActionDialog
      v-if="addActionDialogIsShown"
      @add-action="addActionDialogAddActionHandler"
      @cancel="addActionDialogCancelHandler"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import NiaKeyboards from '@/components/NiaKeyboards.vue'
  import NiaModifierTable from '@/components/NiaModifierTable.vue'
  import NiaActionTable from '@/components/NiaActionTable.vue'
  import NiaAddModifierDialog from '@/components/dialogs/NiaAddModifierDialog.vue'
  import NiaAddActionDialog from '@/components/dialogs/NiaAddActionDialog.vue'

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
      NiaAddModifierDialog,
      NiaAddActionDialog,
    },
  })
  export default class Keyboards extends Vue {
    // add modifier dialog
    showAddModifierDialogHandler(): void {
      store.commit.UIModule.showAddModifierDialog()
    }

    addModifierDialogAddModifierHandler(): void {
      const deviceName: string = store.getters.UIModule.addModifierDialogSelectedKeyboard
      const device: NiaDeviceInfo | null = store.getters.KeymappingModule.getDeviceByName(deviceName)

      if (device === null) {
        // todo: show error here
        return
      }

      const keyCode: number = store.getters.UIModule.addModifierDialogSelectedKeyCode
      const modifierAlias: string = store.getters.UIModule.addModifierDialogSelectedModifierAlias

      if (store.getters.KeymappingModule.isModifierAlreadyDefined(device.getDeviceId(), keyCode)) {
        // todo: show error here
        return
      }

      this.$emit('define-modifier', new NiaDefineModifierEvent({
        keyboardId: device.getDeviceId(),
        keyCode,
        modifierAlias,
      }))
      store.commit.UIModule.hideAddModifierDialog()
    }

    addModifierDialogCancelHandler(): void {
      store.commit.UIModule.hideAddModifierDialog()
    }

    addModifierDialogSelectKeyboardHandler(keyboardName: string): void {
      store.commit.UIModule.setAddModifierDialogSelectedKeyboardName(keyboardName)
    }

    addModifierDialogSelectKeyCodeHandler(keyCodeName: string): void {
      const keyCode: number = mapStringToKeyCode(keyCodeName)

      if (Number.isInteger(keyCode)) {
        store.commit.UIModule.setAddModifierDialogSelectedKeyCode(keyCode)
      }
    }

    addModifierDialogSelectModifierAliasHandler(modifierAlias: string): void {
      store.commit.UIModule.setAddModifierDialogSelectedModifierAlias(modifierAlias)
    }

    //
    showAddActionDialogHandler(): void {
      store.commit.UIModule.showAddActionDialog()
    }

    addActionDialogAddActionHandler(): void {
      return
    }

    addActionDialogCancelHandler(): void {
      store.commit.UIModule.hideAddActionDialog()
    }

    toggleModifierSelection(modifier: NiaModifierDescription): void {
      store.commit.UIModule.toggleModifierSelection(modifier)
    }

    removeSelectedModifiersHandler(): void {
      this.$emit('remove-selected-modifiers')
    }

    clickKeyboardHandler(): void {
      store.commit.UIModule.unselectKeys()
    }

    clickKeyHandler(key: NiaKey): void {
      store.commit.UIModule.toggleKeySelection(key)
    }

    get addModifierDialogIsShown(): boolean {
      return store.getters.UIModule.addModifierDialogIsShown
    }

    get addActionDialogIsShown(): boolean {
      return store.getters.UIModule.addActionDialogIsShown
    }

    get getDevicesInfo(): Array<NiaDeviceInfo> {
      return store.getters.KeymappingModule.devices
    }

    get getSelectedKeys(): Array<NiaKey> {
      return store.getters.UIModule.getSelectedKeys
    }

    get getDefinedModifiers(): Array<NiaModifierDescription> {
      return store.getters.KeymappingModule.definedModifiers
    }

    get getSelectedModifiers(): Array<NiaModifierDescription> {
      return store.getters.UIModule.getSelectedModifiers
    }

    get getDefinedActions(): Array<NiaAction> {
      return store.getters.KeymappingModule.definedActions
    }

    get getSelectedActions(): Array<NiaAction> {
      return store.getters.UIModule.getSelectedActions
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
