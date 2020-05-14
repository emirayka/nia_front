<template>
  <div id="app">
    <NiaAppNavbar @nav="handleNav" />

    <keep-alive>
      <router-view
        @nav="handleNav"
        @execute="executeHandler($event)"
        @define-keyboard="defineKeyboardHandler($event)"
        @remove-keyboard="removeKeyboardHandler($event)"
        @define-modifier="defineModifierHandler($event)"
        @remove-modifier="removeModifierHandler($event)"
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
  import {
    ExecutionResult,
  } from '@/store/models'

  import {
    NiaExecuteCodeEvent,
    NiaDefineDeviceEvent,
    NiaRemoveDeviceEvent,
    NiaDefineModifierEvent,
    NiaRemoveModifierEvent,
    NiaSynchronizeEvent,
    NiaEvent,
    NiaEventResponseSerialized,
    NiaEventResponse,
    NiaSynchronizeEventResponse,
    NiaExecuteCodeEventResponse,
    NiaDefineDeviceEventResponse,
    NiaRemoveDeviceEventResponse,
    NiaDefineModifierResponse,
    NiaDefineModifierEventResponse,
    NiaRemoveModifierEventResponse,
    NiaDeviceInfo,
    NiaModifierDescriptionObject,
    NiaModifierDescription,
  } from './utils'
  import {Modifier} from '@/store/models/modifier'

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
          path: event,
        })
      },

      sendEvent: function(event: NiaEvent) {
        ipcRenderer.send('nia-server-event', event.serialize())
      },

      executeHandler: function (executeCodeEvent: NiaExecuteCodeEvent) {
        console.log(executeCodeEvent)
        const event: NiaEvent = executeCodeEvent.toEvent()

        this.sendEvent(event)
      },

      defineKeyboardHandler: function (defineKeyboardEvent: NiaDefineDeviceEvent): void {
        const event: NiaEvent = defineKeyboardEvent.toEvent()

        this.sendEvent(event)
      },

      removeKeyboardHandler: function (removeKeyboardEvent: NiaRemoveDeviceEvent): void {
        const event: NiaEvent = removeKeyboardEvent.toEvent()

        this.sendEvent(event)
      },

      defineModifierHandler: function (defineModifierEvent: NiaDefineModifierEvent): void {
        const event: NiaEvent = defineModifierEvent.toEvent()

        this.sendEvent(event)
      },

      removeModifierHandler: function (removeModifierEvent: NiaRemoveModifierEvent): void {
        const event: NiaEvent = removeModifierEvent.toEvent()
        console.log('Sent remove modifier event.')

        this.sendEvent(event)
      },
      handleSynchronizeEventResponse: function(response: NiaSynchronizeEventResponse): void {
        const version: string = response.getVersion()
        const info: string = response.getInfo()
        const devicesInfo: Array<NiaDeviceInfo> = response.getDevicesInfo()
        const definedModifiers: Array<NiaModifierDescription> = response.getDefinedModifiers()

        store.commit.KeymappingModule.setVersion(version)
        store.commit.KeymappingModule.setInfo(info)
        store.commit.KeymappingModule.setDevicesInfo(devicesInfo)
        store.commit.KeymappingModule.setModifiers(definedModifiers)
      },
      handleExecuteCodeEventResponse: function(response: NiaExecuteCodeEventResponse): void {
        const executionResult: ExecutionResult = response.toExecutionResult()

        store.commit.KeymappingModule.setExecutionResult(executionResult)
      },
      handleDefineKeyboardResponse: function(response: NiaDefineDeviceEventResponse): void {
        store.commit.KeymappingModule.makeKeyboardDefined(response.getDeviceId())
      },
      handleRemoveKeyboardResponse: function(response: NiaRemoveDeviceEventResponse): void {
        store.commit.KeymappingModule.makeKeyboardRemoved(response.getKeyboardPath())
      },
      handleDefineModifierResponse: function(response: NiaDefineModifierEventResponse): void {
        const modifier: Modifier = response.toModifier()

        store.commit.KeymappingModule.defineModifier(modifier)
      },
      handleRemoveModifierResponse: function(response: NiaRemoveModifierEventResponse): void {
        const modifier: Modifier = response.toModifier()

        store.commit.KeymappingModule.removeModifier(modifier)
      },
      handleEventResponse: function(response: NiaEventResponse): void {
        if (response.isSynchronizeEventResponse()) {
          this.handleSynchronizeEventResponse(response.takeSynchronizeEventResponse())
        } else if (response.isExecuteCodeEventResponse()) {
          this.handleExecuteCodeEventResponse(response.takeExecuteCodeEventResponse())
        } else if (response.isDefineKeyboardEventResponse()) {
          this.handleDefineKeyboardResponse(response.takeDefineKeyboardEventResponse())
        } else if (response.isRemoveKeyboardEventResponse()) {
          this.handleRemoveKeyboardResponse(response.takeRemoveKeyboardEventResponse())
        } else if (response.isDefineModifierEventResponse()) {
          this.handleDefineModifierResponse(response.takeDefineModifierEventResponse())
        } else if (response.isRemoveModifierEventResponse()) {
          this.handleRemoveModifierResponse(response.takeRemoveModifierEventResponse())
        } else {
          console.log('unknown')
        }
      }
    },
    mounted: function () {
      if (this.$router.currentRoute.path !== '/Keyboards') {
        this.$router.push({
          path: '/Keyboards',
        })
      }

      ipcRenderer.on('nia-server-event-response', (_, eventResponseSerialized: NiaEventResponseSerialized) => {
        const eventResponse: NiaEventResponse = NiaEventResponse.deserialize(eventResponseSerialized)
        this.handleEventResponse(eventResponse)
      })

      const synchronizeEvent: NiaSynchronizeEvent = new NiaSynchronizeEvent({})
      const event: NiaEvent = synchronizeEvent.toEvent()
      console.log(event)

      ipcRenderer.send('nia-server-event', event.serialize())
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
