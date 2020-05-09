<template>
  <div class="nia-editor">
    <NiaToolbar>
      <NiaToolbarItem>
        1
      </NiaToolbarItem>
      <NiaToolbarItem>
        2
      </NiaToolbarItem>
    </NiaToolbar>

    <div class="nia-editor__content">
      <div class="nia-editor__content__nia-code-editor-wrapper">
        <NiaCodeEditor
          class="nia-editor__nia-code-editor"
          :code="code"
          @change="changeHandler($event)"
          @execute="$emit('execute', $event)"
        />
      </div>

      <div class="nia-editor__content__nia-console-wrapper">
        <NiaConsole
          class="nia-editor__nia-console"
          :log="log"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {
    mapState,
  } from 'vuex'

  @Component({
    name: "Editor",
    computed: {
      ...mapState(['log', 'code']),
    },
  })
  export default class Editor extends Vue{
    changeHandler(code: string): void {
      this.$store.commit('setCode', code)
    }
  }
</script>

<style
  scoped
  lang="scss"
>

  .nia-editor {
    height: 100%;
  }

  .nia-editor__content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .nia-editor__content__nia-code-editor-wrapper {
  }

  .nia-editor__content__nia-console-wrapper {
  }

</style>