<template>
  <div class="nia-tabs">
    <div class="nia-tabs__tabs">
      <ul class="nia-tabs__tabs__list">
        <li
          class="nia-tabs__tabs__list__item"
          v-for="(tab, index) in tabs"
          :class="{ 'is-active': tab.isActive }"
          :key="index"
        >
          <a
            class="nia-tabs__tabs__list__item__link"
            :href="tab.href"
            @click="selectTab(tab)"
          >{{ tab.title }}</a>
        </li>
      </ul>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Watch} from 'vue-property-decorator'

  @Component({
    name: "NiaTabs",
  })
  export default class NiaTabs extends Vue {
    tabs: Array<any> = []
    // data(): object {
    //   return {
    //     tabs: []
    //   }
    // }

    updateTabs(): void {
      Vue.nextTick(() => {
        if (this.tabs.length > 0) {
          this.selectTab(this.tabs[0])
        }
      })
    }

    selectTab(selectedTab: any) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.title === selectedTab.title);
      })
    }

    created(): void {
      console.log('cr')
      this.tabs = this.$children;
    }

    mounted(): void {
      console.log('mnt')
      this.updateTabs()
    }

    destroyed(): void {
      console.log('destr')
    }

    @Watch('tabs')
    onTabsChanged(): void {
      this.updateTabs()
    }

  }
</script>

<style scoped>
  .nia-tabs {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    box-sizing: border-box;

    /*background-color: #0A0A0A;*/
    /*color: #FBFCD4 !important;*/
  }

  .nia-tabs__tabs {
  }

  .nia-tabs__tabs__list {
    list-style: none;
  }

  .nia-tabs__tabs__list__item {
    display: inline-block;
    margin-left: 5px;
    list-style: none;
  }
</style>