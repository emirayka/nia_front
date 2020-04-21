<template>
  <div class="editor">
    <NiaAppNavbar @nav="$emit('nav', $event)" />
    <NiaToolbar>
      <NiaToolbarItem>
        1
      </NiaToolbarItem>
      <NiaToolbarItem>
        2
      </NiaToolbarItem>
    </NiaToolbar>

    <NiaCodeEditor />
  </div>
</template>

<script>
  import NiaAppNavbar from '../components/NiaAppNavbar.vue'

  export default {
    name: "Editor",
    components: {
      NiaAppNavbar,
    },
  }
</script>

<style
  scoped
  lang="scss"
>

  .editor {
    height: 100%;
  }

  .nia-code-editor__codemirror {
    height: 100%;
  }

</style>