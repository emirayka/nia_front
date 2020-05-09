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
        <NiaColoredDiv>
          2
        </NiaColoredDiv>
      </NiaGridItem>

      <NiaGridItem
        :x="21"
        :y="1"
        :w="80"
        :h="70"
      >
        <NiaKeyboards />
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
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {
    mapGetters,
  } from 'vuex'

  import NiaKeyboards from '@/components/NiaKeyboards.vue'
  import {GridItemData} from 'vue-grid-layout'

  @Component({
    name: 'Keyboards',
    components: {
      NiaKeyboards,
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
  .keyboards {
  }

  .nia-grid-layout {
    box-sizing: border-box;
    margin-top: 15px;
    height: 1008px;
  }
</style>
