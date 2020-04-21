<template>
  <div id="app">
    <router-view @nav="handleNav"/>
  </div>
</template>

<script>
  import {
    ipcRenderer,
  } from 'electron'

  export default {
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
    },
    mounted: function () {
      if (this.$router.currentRoute.path !== '/Keyboards') {
        this.$router.push({
          path: '/Keyboards',
        })
      }

      ipcRenderer.on('nia-server-handshake', (event, {version, info}) => {
        this.$store.commit('setVersion', version)
        this.$store.commit('setInfo', info)
      })

      ipcRenderer.on('nia-server-get-devices', (event, devices) => {
        this.$store.commit('setDevices', devices)
      })

      ipcRenderer.on('nia-server-get-devices-info', (event, devicesInfo) => {
        this.$store.commit('setDevicesInfo', devicesInfo)
      })


      ipcRenderer.send('nia-app-mounted', {})
    },
  }
</script>

<style lang="scss">
  html, body {
    width: 100%;
    height: 100%;
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
