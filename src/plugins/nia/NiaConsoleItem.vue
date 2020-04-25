<template>
  <div
    class="nia-console-item"
    :class="classObject"
  >
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: "NiaConsoleItem",
    props: {
      logItem: {
        type: Object,
        required: true,
      },
    },
    computed: {
      classObject: function () {
        return {
          success: this.logItem.success,
          error: this.logItem.error,
          failure: this.logItem.failure,
        }
      },
      message: function () {
        return this.logItem.message
      },
    },
  }
</script>

<style scoped>
  .nia-console-item {
    width: 100%;
    margin: 0;
    padding: 0 0 0 1em;
  }

  .nia-console-item.success {
    background-color: lightgreen;
    color: black;
  }

  .nia-console-item.error {
    background-color: lightcoral;
    color: black;
  }

  .nia-console-item.failure {
    background-color: darkred;
    font-weight: bold;
  }
</style>