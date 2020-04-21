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

<script>
  import {
    mapGetters,
  } from 'vuex'

  import NiaAppNavbar from '../components/NiaAppNavbar.vue'
  import NiaKeyboard from '../components/NiaKeyboard.vue'

  export default {
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
  }
</script>

<style
  scoped
  lang="scss"
>
</style>
