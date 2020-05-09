<template>
  <div id="app">
    <NiaAppNavbar @nav="handleNav"/>
    <keep-alive>
      <router-view
        @nav="handleNav"
        @execute="executeHandler($event)"
      />
    </keep-alive>
  </div>
</template>

<script lang="ts">
  import {
    ipcRenderer,
  } from 'electron'

  import NiaAppNavbar from '@/components/NiaAppNavbar.vue'

  export default {
    components: {
      NiaAppNavbar
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
      executeHandler: function (code: string) {
        ipcRenderer.send('nia-server-execute-code-request', {
          code
        })
      },
    },
    mounted: function () {
      const store = this.$store.direct

      if (this.$router.currentRoute.path !== '/Keyboards') {
        this.$router.push({
          path: '/Keyboards',
        })
      }

      ipcRenderer.on('nia-server-handshake-result', (event, {version, info}) => {
        store.commit.KeymappingModule.setVersion(version)
        store.commit.KeymappingModule.setInfo(info)
      })

      ipcRenderer.on('nia-server-get-devices-result', (event, devices) => {
        store.commit.KeymappingModule.setDevices(devices)
      })

      ipcRenderer.on('nia-server-get-devices-info-result', (event, devicesInfo) => {
        store.commit.KeymappingModule.setDevicesInfo(devicesInfo)
      })

      ipcRenderer.on('nia-server-execute-code-result', (event, executionResult) => {
        store.commit.KeymappingModule.setExecutionResult(executionResult)
      })

      ipcRenderer.send('nia-app-mounted', {})
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
