<template>
  <tr
    class="nia-table-row"
    @click="$emit('click', $event)"
    @mouseover="$emit('hover', true)"
    @mouseleave="$emit('hover', false)"
  >
    <slot></slot>
  </tr>
</template>

<script>
  export default {
    name: "NiaTableRow",
  }
</script>

<style scoped>
  tr {
    width: 100%;

    line-height: 1.15;
    font-family: Montserrat, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-color: #46637f;

    transition: all 0.25s ease-in;
  }
</style>