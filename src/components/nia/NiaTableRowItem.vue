<template>
  <td class="nia-table-row-item">
    <slot></slot>
  </td>
</template>

<script>
  export default {
    name: "NiaTableRowItem",
  }
</script>

<style scoped>
  .nia-table-row-item {
    text-align: left;

    border-radius: 15px;
    padding: 10px;

    &:first-child {
      padding-top: .5em;
    }

    &:last-child {
      padding-bottom: .5em;
    }

    &:before {
      content: attr(data-th) ": ";
    }
  }
</style>