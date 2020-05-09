<template>
  <div
    class="nia-tabs"
    :style="niaTabsStyle"
  >
    <div
      class="nia-tabs__tabs"
      :style="niaTabsTabsStyle"
    >
      <ul
        class="nia-tabs__tabs__list"
        :style="niaTabsTabsListStyle"
      >
        <li
          class="nia-tabs__tabs__list__item"
          v-for="(tab, index) in tabs"
          :style="niaTabsTabsListItemStyle(isSelected(tab), hover === tab)"
          :key="index"
          @click="selectTab(tab)"
          @mouseover="hover = tab"
          @mouseleave="hover = null"
        >
          <a
            class="nia-tabs__tabs__list__item__link"
            :style="niaTabsTabsListItemLinkStyle(isSelected(tab), hover === tab)"
            :class="{'selected': isSelected(tab)}"
          >{{ tab.title }}</a>
        </li>
      </ul>
    </div>

    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Watch} from 'vue-property-decorator'

  import store from '@/store'
  import NiaTab from '@/components/nia/NiaTab.vue'

  @Component({
    name: "NiaTabs.ts",
  })
  export default class NiaTabs extends Vue {
    tabs: Array<Vue> = []
    selectedTab: Vue | null = null
    hover: Vue | null = null

    updateTabs(): void {
      Vue.nextTick(() => {
        if (this.tabs.length > 0) {
          this.selectTab(this.tabs[0])
        }
      })
    }

    selectTab(selectedTab: NiaTab) {
      this.selectedTab = selectedTab

      this.tabs.forEach((tab: NiaTab) => tab.selected = tab === this.selectedTab)
    }

    isSelected(tab: Vue): boolean {
      return this.selectedTab === tab
    }

    created(): void {
      this.tabs = this.$children;
    }

    mounted(): void {
      this.updateTabs()
    }

    @Watch('tabs')
    onTabsChanged(): void {
      this.updateTabs()
    }

    get niaTabsStyle(): object {
      return {}
    }

    get niaTabsTabsStyle(): object {
      return {}
    }

    get niaTabsTabsListStyle(): object {
      return {}
    }

    niaTabsTabsListItemStyle(isSelected: boolean, isHovered: boolean): object {
      const backgroundColor: string = isSelected
        ? store.getters.ThemeModule.getBackgroundColorAccent2
        : isHovered
          ? store.getters.ThemeModule.getBackgroundColorAccentLight
          : store.getters.ThemeModule.getBackgroundColorAccent1

      return {
        backgroundColor,
      }
    }

    niaTabsTabsListItemLinkStyle(isSelected: boolean, isHovered: boolean): object {
      const color: string = isSelected
        ? store.getters.ThemeModule.getForegroundColorAccent2
        : isHovered
          ? store.getters.ThemeModule.getForegroundColorAccentLight
          : store.getters.ThemeModule.getForegroundColorAccent1

      return {
        color,
      }
    }
  }
</script>

<style scoped>
  .nia-tabs {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
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
    background-color: #0A0A0A;
  }

  .nia-tabs__tabs__list {
    list-style: none;
    margin: 0;
    padding: .3125rem 0;
  }

  .nia-tabs__tabs__list__item {
    box-sizing: border-box;

    display: inline-block;
    list-style: none;

    margin-left: 5px;

    border: 1px solid transparent;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;

    font-size: 1.25rem;
    white-space: nowrap;
    font-weight: 400;
    text-align: left;
    text-decoration: none;

    background-color: transparent;
    color: #007bff;
  }


  .nia-tabs__tabs__list__item {
    color: #ffffff;
  }

  .nia-tabs__tabs__list__item__link {
    color: #ffffff;
    transition: 0.05s;
    font-size: 20px;
    text-decoration: none;
    padding: 0 10px;

    border-radius: 7px;
  }

  .nia-tabs__tabs__list__item__link:hover {
    cursor: pointer;
  }
</style>
