<template>
  <table class="nia-table">
    <tbody class="nia-table__tbody">
      <slot></slot>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "NiaTable",
  }
</script>

<style scoped>
  .nia-table {
    line-height: 1.15;
    font-family: Montserrat, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    margin: 1em 0;
    min-width: 300px;
    background: #34495E;
    color: #fff;
    border-radius: .4em;
    overflow: hidden;
  }

  .nia-table__tbody {
    line-height: 1.15;
    font-family: Montserrat, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    color: #fff;
  }
</style>