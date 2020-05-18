<template>
  <tr class="nia-table-header-row">
    <slot></slot>
  </tr>
</template>

<script>
  export default {
    name: 'NiaTableHeaderRow',
  }
</script>

<style
  scoped
  lang="scss"
>
  th.nia-table-header-row {
    width: 100%;

    line-height: 1.15;
    font-family: Montserrat, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    color: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-color: #46637f;
  }

</style>