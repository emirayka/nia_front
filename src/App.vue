<template>
  <div id="app">
    <NiaAppNavbar @nav="handleNav" />

    <keep-alive>
      <router-view
        @nav="handleNav"
      />
    </keep-alive>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  import NiaAppNavbar from '@/components/NiaAppNavbar.vue'
  import Component from 'vue-class-component'

  import store from '@/store'

  @Component({
    components: {
      NiaAppNavbar,
    },
  })
  export default class extends Vue {
    handleNav(event: string) {
      if (this.$router.currentRoute.path === event) {
        return
      }

      this.$router.replace({
        path: event,
      })
    }
    mounted() {
      if (this.$router.currentRoute.path !== '/Keyboards') {
        this.$router.push({
          path: '/Keyboards',
        })
      }

      store.dispatch.Connection.connect()
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
