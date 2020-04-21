<template>
  <div
    class="nia-code-editor"
  >
    <div
      class="nia-code-editor__codemirror"
      ref="editorElement"
    >
    </div>
  </div>
</template>

<script>
  import codemirror from 'codemirror'

  import 'codemirror/lib/codemirror.css'

  import 'codemirror/mode/javascript/javascript'
  import '@/plugins/codemirror-nia'

  import 'codemirror/theme/darcula.css'

  export default {
    name: 'NiaCodeEditor',
    data: () => ({
      code: 'const a = 10',
      editor: null,
    }),
    mounted: function () {
      this.editor = codemirror(
        this.$refs.editorElement,
        {
          value: "function myScript(){return 100;}\n",
          mode: "nia",
          theme: 'darcula',
          lineNumbers: true,
          autofocus: true,
          scrollbarStyle: null,
        })
    },
  }
</script>

<style
  scoped
  lang="scss"
>
  .nia-code-editor__codemirror {
    height: 100%;
  }
</style>
