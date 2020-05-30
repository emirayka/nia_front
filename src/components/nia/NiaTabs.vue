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
          :style="niaTabsTabsListItemStyle(isSelected(index), hover === tab)"
          :key="index"
          @click="selectTab(index)"
          @contextmenu.prevent.stop="contextMenuHandler(index, $event)"
          @mouseover="hover = tab"
          @mouseleave="hover = null"
        >
          <a
            class="nia-tabs__tabs__list__item__link"
            :style="niaTabsTabsListItemLinkStyle(isSelected(index), hover === tab)"
            :class="{'selected': isSelected(index)}"
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
  import {Prop, Watch} from 'vue-property-decorator'

  import store from '@/store'
  import NiaTab from '@/components/nia/NiaTab.vue'

  export interface NiaTabContextMenuEvent {
    pageX: number;
    pageY: number;
    index: number;
  }

  @Component({
    name: "NiaTabs.ts",
  })
  export default class NiaTabs extends Vue {
    tabs: Array<Vue> = []
    hover: Vue | null = null

    @Prop({required: true})
    selectedTabIndex!: number

    selectTab(selectedTabIndex: number) {
      // @ts-ignore
      this.tabs.forEach((tab: NiaTab, tabIndex: number) => tab.selected = tabIndex === this.selectedTabIndex)
      this.$emit('tab-selected', selectedTabIndex)
    }

    contextMenuHandler(index: number, mouseEvent: MouseEvent) {
      const event: NiaTabContextMenuEvent = {
        pageX: mouseEvent.pageX,
        pageY: mouseEvent.pageY,
        index: index,
      }

      this.$emit('contextmenu', event)
    }

    isSelected(tabIndex: number): boolean {
      return this.selectedTabIndex === tabIndex
    }

    created(): void {
      this.tabs = this.$children;
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
        ? store.getters.Theme.getBackgroundColorAccent2
        : isHovered
          ? store.getters.Theme.getBackgroundColorAccentLight
          : store.getters.Theme.getBackgroundColorAccent1

      return {
        backgroundColor,
      }
    }

    niaTabsTabsListItemLinkStyle(isSelected: boolean, isHovered: boolean): object {
      const color: string = isSelected
        ? store.getters.Theme.getForegroundColorAccent2
        : isHovered
          ? store.getters.Theme.getForegroundColorAccentLight
          : store.getters.Theme.getForegroundColorAccent1

      return {
        color,
      }
    }

    updateTabs(): void {
      this.tabs.forEach((tab: NiaTab, tabIndex: number) => tab.selected = tabIndex === this.selectedTabIndex)
    }

    @Watch('selectedTabIndex')
    onSelectedTabIndexChanged(): void {
      this.updateTabs()
    }

    @Watch('tabs')
    onTabsChanged(): void {
      this.updateTabs()
    }

    mounted() {
      this.updateTabs()
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
