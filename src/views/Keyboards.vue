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
        :w="20"
        :h="100"
      >
        <NiaAccordion>
          <NiaAccordionItem
            :id="'111'"
            :title="'title-1'"
            :multiple="false"
          >
            <NiaModifierTable
              :modifiers="getModifiers"
              @add-modifier="showAddModifierDialogHandler()"
              @select-modifier="selectModifierHandler($event)"
              @remove-modifier="removeModifierHandler($event)"
            />
          </NiaAccordionItem>
          <NiaAccordionItem
            :id="'112'"
            :title="'title-2'"
            :multiple="false"
          >
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolor dolore, ducimus exercitationem
              facilis fugiat, harum, in ipsam iure laudantium officia officiis optio quod rem suscipit veniam veritatis
              voluptas voluptates.
            </div>
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
        :x="21"
        :y="1"
        :w="80"
        :h="70"
      >
        <NiaKeyboards
          :devices-info="getDevicesInfo"
          :selected-key="getSelectedKey"
          @define-keyboard="$emit('define-keyboard', $event)"
          @remove-keyboard="$emit('remove-keyboard', $event)"
          @click-keyboard="clickKeyboardHandler($event)"
          @click-key="clickKeyHandler($event)"
        />
      </NiaGridItem>

      <NiaGridItem
        :x="21"
        :y="71"
        :w="80"
        :h="30"
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
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import NiaKeyboards from '@/components/NiaKeyboards.vue'
  import NiaModifierTable from '@/components/NiaModifierTable.vue'
  import NiaAddModifierDialog from '@/components/dialogs/NiaAddModifierDialog.vue'
  import {DeviceInfo} from '@/store/models'

  import store from '@/store'
  import {
    KeyboardKey
  } from '@/store/models'
  import {mapStringToKeyCode} from '@/utils/utils'
  import {NiaDefineModifierEvent, NiaRemoveModifierEvent} from '@/utils'
  import {Modifier} from '@/store/models/modifier'

  @Component({
    name: 'Keyboards',
    components: {
      NiaKeyboards,
      NiaModifierTable,
      NiaAddModifierDialog,
    },
  })
  export default class Keyboards extends Vue {
    showAddModifierDialogHandler(): void {
      store.commit.UIModule.showAddModifierDialog()
    }

    addModifierDialogAddModifierHandler(): void {
      const keyboardName: string = store.getters.UIModule.addModifierDialogSelectedKeyboard
      const keyboardPath: string | null = store.getters.KeymappingModule.getKeyboardPathByName(keyboardName)

      if (keyboardPath === null) {
        // todo: show error here
        return
      }

      const keyCode: number = store.getters.UIModule.addModifierDialogSelectedKeyCode
      const modifierAlias: string = store.getters.UIModule.addModifierDialogSelectedModifierAlias

      if (store.getters.KeymappingModule.isModifierAlreadyDefined(keyboardPath, keyCode)) {
        // todo: show error here
        return
      }

      this.$emit('define-modifier', new NiaDefineModifierEvent(
        keyboardPath,
        keyCode,
        modifierAlias,
      ))
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

    selectModifierHandler(modifier: Modifier): void {
      console.log(modifier)
      store.commit.UIModule.selectModifier(modifier)
    }

    removeModifierHandler(): void {
      const selectedModifier: Modifier | null = store.getters.UIModule.getSelectedModifier

      if (selectedModifier !== null) {
        const removeModifierEvent: NiaRemoveModifierEvent = new NiaRemoveModifierEvent(
          selectedModifier.keyboardKey.keyboardPath,
          selectedModifier.keyboardKey.keyCode,
        )
        this.$emit('remove-modifier', removeModifierEvent)
      }
    }

    clickKeyboardHandler(): void {
      store.commit.UIModule.unselectKey()
    }

    clickKeyHandler(keyboardKey: KeyboardKey): void {
      store.commit.UIModule.selectKey(keyboardKey)
    }

    get addModifierDialogIsShown(): boolean {
      return store.getters.UIModule.addModifierDialogIsShown
    }

    get getModifiers(): Array<Modifier> {
      return store.getters.KeymappingModule.modifiers
    }

    get getDevicesInfo(): Array<DeviceInfo> {
      return store.getters.KeymappingModule.keyboards
    }

    get getSelectedKey(): KeyboardKey | null {
      return store.getters.UIModule.getSelectedKey
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
