<template>
  <NiaContainer
    class="nia-mapping-view"
  >
    <NiaContainer
      class="nia-mapping-view__mapping_table"
      :inline="true"
    >
      <NiaMappingTable />
    </NiaContainer>

    <NiaContainer
      class="nia-mapping-view__mapping_content"
      :inline="true"
    >
      <NiaSelectedMappingInfo />
    </NiaContainer>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'
  import {NiaMapping} from '@/utils'

  import NiaMappingTable from './nia-mapping-view/NiaMappingTable.vue'
  import NiaSelectedMappingInfo from './nia-mapping-view/NiaSelectedMappingInfo.vue'

  @Component({
    name: 'NiaMappingView',
    components: {
      NiaMappingTable,
      NiaSelectedMappingInfo,
    },
  })
  export default class NiaMappingView extends Vue {
    get definedMappings(): Array<NiaMapping> {
      return store.getters.Keymapping.Mappings.definedMappings
    }

    showAddMappingDialog(): void {
      store.commit.UI.AddMappingDialog.show()
    }
  }
</script>

<style
  scoped
  lang="scss"
>
  .nia-mapping-view {
    width: 100%;
    height: 100%;
  }

  .nia-mapping-view__mapping_table {
    display: inline-block;
    vertical-align: top;
    width: 25%;
  }

  .nia-mapping-view__mapping_content {
    display: inline-block;
    vertical-align: top;
    width: 75%;
  }
</style>