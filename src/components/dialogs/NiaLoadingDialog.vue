<template>
  <NiaDialog>
    <template v-slot:header>
      Loading...
    </template>

    <template v-slot:body>
      <NiaLoader></NiaLoader>
    </template>
  </NiaDialog>
</template>

<script>
  export default {
    name: "NiaLoadingDialog",
  }
</script>

<style scoped>
</style>