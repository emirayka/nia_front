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
        <NiaAccordion>
          <NiaAccordionItem :id="'111'" :title="'title-1'" :multiple="false">
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolor dolore, ducimus exercitationem facilis fugiat, harum, in ipsam iure laudantium officia officiis optio quod rem suscipit veniam veritatis voluptas voluptates.</div>
          </NiaAccordionItem>
          <NiaAccordionItem :id="'112'" :title="'title-2'" :multiple="false">
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolor dolore, ducimus exercitationem facilis fugiat, harum, in ipsam iure laudantium officia officiis optio quod rem suscipit veniam veritatis voluptas voluptates.</div>
          </NiaAccordionItem>
          <NiaAccordionItem :id="'113'" :title="'title-3'" :multiple="false">
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolor dolore, ducimus exercitationem facilis fugiat, harum, in ipsam iure laudantium officia officiis optio quod rem suscipit veniam veritatis voluptas voluptates.</div>
          </NiaAccordionItem>
        </NiaAccordion>
      </NiaGridItem>

      <NiaGridItem
        :x="21"
        :y="1"
        :w="80"
        :h="70"
      >
        <NiaKeyboards :devices-info="getDevicesInfo"/>
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
  import {DeviceInfo} from '@/store/models'

  import store from '@/store'

  @Component({
    name: 'Keyboards',
    components: {
      NiaKeyboards,
    },
  })
  export default class Keyboards extends Vue {
    get getDevicesInfo(): Array<DeviceInfo> {
      return store.getters.KeymappingModule.getDevicesInfo
    }
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
