<template>
  <NiaContainer
    class="nia-selected-mapping-info"
  >
    <NiaContainer v-if="!noMappingIsSelected">
      <NiaTabs>
        <NiaTab :title="'Keys'">
          <NiaContainer
            class="nia-selected-mapping-info__action-keys"
            :flex="true"
          >

            <NiaSelectedMappingInfoSelect
              :title="'Text keys'"
              :selected="getters.isActiveKeysText"
              :selected-index="getters.keysTextIndex"
              :items="getters.itemsKeysText"
              :width="30"
              @selected="commit.selectKeysText()"
              @selected-index="commit.setKeysTextIndex($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoSelect
              :title="'Number keys'"
              :selected="getters.isActiveKeysNumber"
              :selected-index="getters.keysNumberIndex"
              :items="getters.itemsKeysNumber"
              :width="30"
              @selected="commit.selectKeysNumber()"
              @selected-index="commit.setKeysNumberIndex($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoSelect
              :title="'Function keys'"
              :selected="getters.isActiveKeysFunction"
              :selected-index="getters.keysFunctionIndex"
              :items="getters.itemsKeysFunction"
              :width="30"
              @selected="commit.selectKeysFunction()"
              @selected-index="commit.setKeysFunctionIndex($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoSelect
              :title="'Control keys'"
              :selected="getters.isActiveKeysControl"
              :selected-index="getters.keysControlIndex"
              :items="getters.itemsKeysControl"
              :width="30"
              @selected="commit.selectKeysControl()"
              @selected-index="commit.setKeysControlIndex($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoSelect
              :title="'KP keys'"
              :selected="getters.isActiveKeysKP"
              :selected-index="getters.keysKPIndex"
              :items="getters.itemsKeysKP"
              :width="30"
              @selected="commit.selectKeysKP()"
              @selected-index="commit.setKeysKPIndex($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoSelect
              :title="'Multimedia keys'"
              :selected="getters.isActiveKeysMultimedia"
              :selected-index="getters.keysMultimediaIndex"
              :items="getters.itemsKeysMultimedia"
              :width="30"
              @selected="commit.selectKeysMultimedia()"
              @selected-index="commit.setKeysMultimediaIndex($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoSelect
              :title="'Mouse buttons'"
              :selected="getters.isActiveKeysMouseButton"
              :selected-index="getters.keysMouseButtonIndex"
              :items="getters.itemsKeysMouseButton"
              :width="30"
              @selected="commit.selectKeysMouseButton()"
              @selected-index="commit.setKeysMouseButtonIndex($event)"
              @updated="updatedHandler()"
            />

          </NiaContainer>
        </NiaTab>
        <NiaTab :title="'Low level events'">
          <NiaContainer
            class="nia-selected-mapping-info__action-keys"
            :flex="true"
          >

            <NiaSelectedMappingInfoSelect
              :title="'Key press'"
              :selected="getters.isActiveLowLevelKeyPress"
              :selected-index="getters.lowLevelKeyPressIndex"
              :items="getters.itemsLowLevelKeyPress"
              :width="30"
              @selected="commit.selectLowLevelKeyPress()"
              @selected-index="commit.setLowLevelKeyPressIndex($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoSelect
              :title="'Key release'"
              :selected="getters.isActiveLowLevelKeyRelease"
              :selected-index="getters.lowLevelKeyReleaseIndex"
              :items="getters.itemsLowLevelKeyRelease"
              :width="30"
              @selected="commit.selectLowLevelKeyRelease()"
              @selected-index="commit.setLowLevelKeyReleaseIndex($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoSelect
              :title="'Key click'"
              :selected="getters.isActiveLowLevelKeyClick"
              :selected-index="getters.lowLevelKeyClickIndex"
              :items="getters.itemsLowLevelKeyClick"
              :width="30"
              @selected="commit.selectLowLevelKeyClick()"
              @selected-index="commit.setLowLevelKeyClickIndex($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoSelect
              :title="'Mouse button press'"
              :selected="getters.isActiveLowLevelMouseButtonPress"
              :selected-index="getters.lowLevelMouseButtonPressIndex"
              :items="getters.itemsLowLevelMouseButtonPress"
              :width="30"
              @selected="commit.selectLowLevelMouseButtonPress()"
              @selected-index="commit.setLowLevelMouseButtonPressIndex($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoSelect
              :title="'Mouse button release'"
              :selected="getters.isActiveLowLevelMouseButtonRelease"
              :selected-index="getters.lowLevelMouseButtonReleaseIndex"
              :items="getters.itemsLowLevelMouseButtonRelease"
              :width="30"
              @selected="commit.selectLowLevelMouseButtonRelease()"
              @selected-index="commit.setLowLevelMouseButtonReleaseIndex($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoSelect
              :title="'Mouse button click'"
              :selected="getters.isActiveLowLevelMouseButtonClick"
              :selected-index="getters.lowLevelMouseButtonClickIndex"
              :items="getters.itemsLowLevelMouseButtonClick"
              :width="30"
              @selected="commit.selectLowLevelMouseButtonClick()"
              @selected-index="commit.setLowLevelMouseButtonClickIndex($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoNumber2
              :title="'Mouse absolute move'"
              :selected="getters.isActiveLowLevelMouseAbsoluteMove"
              :value1="getters.lowLevelMouseAbsoluteMoveX"
              :value2="getters.lowLevelMouseAbsoluteMoveY"
              :value1-label="'x'"
              :value2-label="'y'"
              :width="30"
              @selected="commit.selectLowLevelMouseAbsoluteMove()"
              @value1-changed="commit.setLowLevelMouseAbsoluteMoveX($event)"
              @value2-changed="commit.setLowLevelMouseAbsoluteMoveY($event)"
              @updated="updatedHandler()"
            />

            <NiaSelectedMappingInfoNumber2
              :title="'Mouse absolute move'"
              :selected="getters.isActiveLowLevelMouseRelativeMove"
              :value1="getters.lowLevelMouseRelativeMoveX"
              :value2="getters.lowLevelMouseRelativeMoveY"
              :value1-label="'x'"
              :value2-label="'y'"
              :width="30"
              @selected="commit.selectLowLevelMouseRelativeMove()"
              @value1-changed="commit.setLowLevelMouseRelativeMoveX($event)"
              @value2-changed="commit.setLowLevelMouseRelativeMoveY($event)"
              @updated="updatedHandler()"
            />

          </NiaContainer>
        </NiaTab>

        <NiaTab :title="'Text type'">
          <NiaContainer class="nia-selected-mapping-info__action-type-text">
            <NiaSelectedMappingInfoText
              class="nia-selected-mapping-info__action-type-text__input"
              :title="'Text to type'"
              :selected="getters.isActiveTextType"
              :value="getters.textToType"
              @selected="commit.selectTextType()"
              @change="commit.setTextToType($event)"
              @updated="updatedHandler()"
            />
          </NiaContainer>
        </NiaTab>

        <NiaTab :title="'Code execute'">
          <NiaContainer class="nia-selected-mapping-info__action-type-code">
            <NiaSelectedMappingInfoCode
              class="nia-selected-mapping-info__action-type-code__input"
              :title="'Code to execute'"
              :selected="getters.isActiveCodeExecute"
              :value="getters.codeToExecute"
              @selected="commit.selectCodeExecute()"
              @change="commit.setCodeToExecute($event)"
              @updated="updatedHandler()"
            />
          </NiaContainer>
        </NiaTab>
      </NiaTabs>
    </NiaContainer>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import NiaSelectedMappingInfoSelect from './nia-selected-mapping-info/NiaSelectedMappingInfoSelect.vue'
  import NiaSelectedMappingInfoNumber2 from './nia-selected-mapping-info/NiaSelectedMappingInfoNumber2.vue'
  import NiaSelectedMappingInfoText from './nia-selected-mapping-info/NiaSelectedMappingInfoText.vue'
  import NiaSelectedMappingInfoCode from './nia-selected-mapping-info/NiaSelectedMappingInfoCode.vue'

  import store from '@/store'
  import {NiaAction, NiaMapping} from '@/utils'

  const getters = store.getters.UI.SelectedMappingInfoView
  const commit = store.commit.UI.SelectedMappingInfoView

  @Component({
    name: 'NiaSelectedMappingInfo',
    components: {
      NiaSelectedMappingInfoSelect,
      NiaSelectedMappingInfoNumber2,
      NiaSelectedMappingInfoText,
      NiaSelectedMappingInfoCode,
    },
  })
  export default class NiaSelectedMappingInfo extends Vue {
    get getters(): (typeof getters) {
      return getters
    }

    get commit(): (typeof commit) {
      return commit
    }

    get noMappingIsSelected(): boolean {
      return store.getters.UI.MappingTable.noMappingIsSelected
    }

    updatedHandler(): void {
      const mapping: NiaMapping | null = store.getters.UI.MappingTable.selectedMapping

      if (mapping === null) {
        return
      }

      const action: NiaAction = store.getters.UI.SelectedMappingInfoView.getCurrentAction
      console.log(action)

      store.dispatch.Connection.changeMapping({
        keyChords: mapping.getKeyChords(),
        action,
      })
    }
  }
</script>

<style scoped>
  .nia-selected-mapping-info__action-keys {
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .nia-selected-mapping-info__action-type-text {
    height: 300px;
  }

  .nia-selected-mapping-info__action-type-text__input {
    box-sizing: border-box;
    width: 95% !important;
    height: 90% !important;
  }

  .nia-selected-mapping-info__action-type-code {
    height: 300px;
  }

  .nia-selected-mapping-info__action-type-code__input {
    box-sizing: border-box;
    width: 95% !important;
    height: 90% !important;
  }

</style>