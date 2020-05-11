<template>
  <div id="app">
    <NiaAppNavbar @nav="handleNav"/>

    <keep-alive>
      <router-view
        @nav="handleNav"
        @execute="executeHandler($event)"
        @define-keyboard="defineKeyboardHandler($event)"
        @remove-keyboard="removeKeyboardHandler($event)"
        @add-modifier="addModifierHandler($event)"
      />
    </keep-alive>
  </div>
</template>

<script lang="ts">
  import {
    ipcRenderer,
  } from 'electron'

  import NiaAppNavbar from '@/components/NiaAppNavbar.vue'

  import store from '@/store'
  import DeviceInfo from '@/store/models/device-info'
  import ExecutionResult from '@/store/models/execution-result'
  import NiaExecuteCodeEvent from '@/utils/event/events/execute-code-event'
  import NiaDefineKeyboardEvent from '@/utils/event/events/define-keyboard-event'
  import NiaRemoveKeyboardEvent from '@/utils/event/events/remove-keyboard-event'
  import NiaDefineModifierEvent from '@/utils/event/events/define-modifier-event'
  import NiaRemoveModifierEvent from '@/utils/event/events/remove-modifier-event'
  import NiaSynchronizeEvent from '@/utils/event/events/synchronize-event'
  import NiaEvent from '@/utils/event/events/event'
  import * from '@/utils/event'

  export default {
    components: {
      NiaAppNavbar,
    },
    data: () => ({
      devices: [],
    }),
    methods: {
      handleNav: function (event) {
        if (this.$router.currentRoute.path === event) {
          return
        }

        this.$router.replace({
          path: event
        })
      },

      executeHandler: function (executeCodeEvent: NiaExecuteCodeEvent) {
        const event: NiaEvent = executeCodeEvent.toEvent()

        ipcRenderer.send('nia-server-event', event)
      },

      defineKeyboardHandler: function (defineKeyboardEvent: NiaDefineKeyboardEvent): void {
        const event: NiaEvent = defineKeyboardEvent.toEvent()

        ipcRenderer.send('nia-server-event', event)
      },

      removeKeyboardHandler: function (removeKeyboardEvent: NiaRemoveKeyboardEvent): void {
        const event: NiaEvent = removeKeyboardEvent.toEvent()

        ipcRenderer.send('nia-server-event', event)
      },

      defineModifierHandler: function (defineModifierEvent: NiaDefineModifierEvent): void {
        const event: NiaEvent = defineModifierEvent.toEvent()

        ipcRenderer.send('nia-server-event', event)
      },
      removeModifierEvent: function (removeModifierEvent: NiaRemoveModifierEvent): void {
        const event: NiaEvent = removeModifierEvent.toEvent()

        ipcRenderer.send('nia-server-event', event)
      },
    },
    mounted: function () {
      if (this.$router.currentRoute.path !== '/Keyboards') {
        this.$router.push({
          path: '/Keyboards',
        })
      }

      // ipcRenderer.on('nia-server-handshake-result', (_, handshakeResult: NiaHandshakeResult) => {
      //   const {
      //     version,
      //     info
      //   } = handshakeResult
      //
      //   store.commit.KeymappingModule.setVersion(version)
      //   store.commit.KeymappingModule.setInfo(info)
      // })
      //
      // ipcRenderer.on('nia-server-get-devices-info-result', (_, getDeviceInfoResults: Array<NiaGetDeviceInfoResult>) => {
      //   const devicesInfo: Array<DeviceInfo> = getDeviceInfoResults.map(
      //     (getDeviceInfoResult: NiaGetDeviceInfoResult) => ({
      //       path: getDeviceInfoResult.path,
      //       name: getDeviceInfoResult.name,
      //       model: getDeviceInfoResult.model,
      //       defined: false
      //     })
      //   )
      //
      //   store.commit.KeymappingModule.setDevicesInfo(devicesInfo)
      // })
      //
      // ipcRenderer.on('nia-server-execute-code-result', (_, executeCodeResult: NiaExecuteCodeResult) => {
      //   const executionResult: ExecutionResult = executeCodeResult as ExecutionResult
      //
      //   store.commit.KeymappingModule.setExecutionResult(executionResult)
      // })
      //
      // ipcRenderer.on('nia-server-define-keyboard-result', (_, defineKeyboardResult: NiaDefineKeyboardResult) => {
      //   const {keyboardPath, result} = defineKeyboardResult
      //
      //   if (result.success) {
      //     store.commit.KeymappingModule.makeKeyboardDefined(keyboardPath)
      //   }
      // })
      //
      // ipcRenderer.on('nia-server-remove-keyboard-result', (event, {keyboardPath, result}) => {
      //   console.log(result)
      //   if (result.success) {
      //     store.commit.KeymappingModule.makeKeyboardRemoved(keyboardPath)
      //   }
      // })
      //
      // ipcRenderer.on('nia-server-add-modifier-result', (event, result) => {
      //   console.log(result)
      //
      //   if (result.success) {
      //     // store.commit.KeymappingModule.makeKeyboardRemoved(keyboardPath)
      //   }
      // })

      const synchronizeEvent: NiaSynchronizeEvent = new NiaSynchronizeEvent()
      const event: NiaEvent = synchronizeEvent.toEvent()

      ipcRenderer.send('nia-server-event', event)
    },
  }
</script>

<style lang="scss">
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    width: 100%;
    height: 100%;

    background-color: #333333;
    color: #ffffff;

    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
