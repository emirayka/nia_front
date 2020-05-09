<template>
  <div class="nia-navbar">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: "NiaNavbar",
  })
  export default class NiaNavbar extends Vue {
  }
</script>

<style scoped>
  .nia-navbar {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --blue: #007bff;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #dc3545;
    --orange: #fd7e14;
    --yellow: #ffc107;
    --green: #28a745;
    --teal: #20c997;
    --cyan: #17a2b8;
    --white: #fff;
    --gray: #6c757d;
    --gray-dark: #343a40;
    --primary: #007bff;
    --secondary: #6c757d;
    --success: #28a745;
    --info: #17a2b8;
    --warning: #ffc107;
    --danger: #dc3545;
    --light: #f8f9fa;
    --dark: #343a40;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    box-sizing: border-box;
    position: relative;
    padding: .5rem 1rem;
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: flex-start;
    background-color: #17a2b8!important;
    /*display: flex;*/
    /*flex-flow: row nowrap;*/
    /*align-items: center;*/
    /*justify-content: flex-start;*/

    /*!*padding: .5rem 1rem;*!*/

    /*font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;*/
    /*font-weight: 400;*/
    /*line-height: 1.5;*/

    /*text-align: left;*/
    /*box-sizing: border-box;*/
    /*position: relative;*/

    /*background-color: #17a2b8!important;*/
    /*color: #212529;*/

    /*display: block;*/
    /*width: 100%;*/
    /*background-color: #0A0A0A;*/
  }
</style>
