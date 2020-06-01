<template>
  <div id="app">
    <NiaAppNavbar @nav="handleNav" />

    <keep-alive>
      <router-view
        @nav="handleNav"
      />
    </keep-alive>

    <NiaLoadingDialog v-if="!connected"/>
    <NiaErrorDialog v-if="errorDialogIsShown" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  import NiaAppNavbar from '@/components/NiaAppNavbar.vue'
  import Component from 'vue-class-component'

  import NiaLoadingDialog from '@/components/dialogs/NiaLoadingDialog.vue'
  import NiaErrorDialog from '@/components/dialogs/NiaErrorDialog.vue'

  import store from '@/store'

  import loggers from '@/utils/logger'
  const logger = loggers('App')

  @Component({
    components: {
      NiaAppNavbar,
      NiaLoadingDialog,
      NiaErrorDialog,
    },
  })
  export default class extends Vue {
    get connected(): boolean {
      return store.getters.Connection.isConnected
    }

    get errorDialogIsShown(): boolean {
      return store.getters.UI.ErrorDialog.isShown
    }

    handleNav(event: string) {
      if (this.$router.currentRoute.path === event) {
        return
      }

      this.$router.replace({
        path: event,
      })
    }
    mounted() {
      logger.debug('App mounted.')

      if (this.$router.currentRoute.path !== '/Devices') {
        this.$router.push({
          path: '/Devices',
        })

        logger.debug('Switched to route "/Devices".')
      }

      store.dispatch.Connection.connectIPCListener()
      store.dispatch.FileConnection.connectIPCListener()
      store.dispatch.FileConnection.startAutoSaving()
    }
    destroyed() {
      store.dispatch.Connection.disconnectIPCListener()
      store.dispatch.FileConnection.disconnectIPCListener()
      store.dispatch.FileConnection.stopAutoSaving()
    }
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
