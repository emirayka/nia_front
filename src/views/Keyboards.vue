<template>
  <div class="home">
    <NiaAppNavbar @nav="$emit('nav', $event)" />

    <NiaTabs >
      <NiaTab
        v-for="(device, index) of getDevicesInfo"
        :key="index"
        :title="device.name"
      >
        <NiaKeyboard
          :width="900"
          :height="240"
          :model="device.model"
        />
      </NiaTab>
    </NiaTabs>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {
    mapGetters,
  } from 'vuex'

  import NiaAppNavbar from '../components/NiaAppNavbar.vue'
  import NiaKeyboard from '../components/NiaKeyboard.vue'

  @Component({
    name: 'Keyboards',
    components: {
      NiaAppNavbar,
      NiaKeyboard,
    },
    computed: {
      ...mapGetters([
        'getDevicesInfo',
      ]),
    },
  })
  export default class Keyboards extends Vue {
  }
</script>

<style
  scoped
  lang="scss"
>
</style>
