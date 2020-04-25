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
      editor: null,
      changeHandler: null,
    }),
    props: {
      code: {
        type: String,
        required: true,
      },
    },
    mounted: function () {
      this.editor = codemirror(
        this.$refs.editorElement,
        {
          value: this.code,
          mode: "nia",
          theme: 'darcula',
          lineNumbers: true,
          autofocus: true,
          scrollbarStyle: null,
        })

      this.editor.setOption("extraKeys", {
        "Ctrl-Enter": (instance) => {
          let selectedCode = instance.getSelection()

          if (selectedCode === '') {
            selectedCode = instance.getValue()
          }

          this.$emit('execute', selectedCode)
        }
      });

      this.changeHandler = (instance, changeObj) => {
        const newCode = instance.getValue()

        this.$emit('change', newCode)
      }
      this.editor.on('change', this.changeHandler)
    },
    destroyed() {
      this.editor.off('change', this.changeHandler)
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
