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

<script lang="ts">
  import Vue from 'vue'
  import codemirror from 'codemirror'

  import 'codemirror/lib/codemirror.css'

  import 'codemirror/mode/javascript/javascript'
  import '@/plugins/codemirror-nia/index'

  import 'codemirror/theme/darcula.css'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'NiaCodeEditor',
  })
  export default class NiaCodeEditor extends Vue {
    editor: codemirror.Editor | null = null
    changeHandler: ((instance: codemirror.Editor, changeObj: codemirror.EditorChangeLinkedList) => void) | null = null

    @Prop({ required: true})
    code!: string;

    $refs!: {
      editorElement: HTMLElement;
    }

    mounted() {
      this.editor = codemirror(
        this.$refs.editorElement,
        {
          value: this.code,
          mode: "nia",
          theme: 'darcula',
          lineNumbers: true,
          autofocus: true,
        },
      )

      this.editor.setOption("extraKeys", {
        "Ctrl-Enter": (instance: CodeMirror.Editor) => {
          let selectedCode = instance.getSelection()

          if (selectedCode === '') {
            selectedCode = instance.getValue()
          }

          this.$emit('execute', selectedCode)
        },
        "Tab": function(instance: CodeMirror.Editor) {
          const indentUnit: number = instance.getOption("indentUnit") || 2
          const spaces: string = Array(indentUnit + 1).join(" ");

          instance.replaceSelection(spaces);
        }
      });

      this.changeHandler = (instance) => {
        const newCode = instance.getValue()

        this.$emit('change', newCode)
      }

      this.editor.on('change', this.changeHandler)
    }

    destroyed() {
      if (this.editor === null || this.changeHandler === null) {
        return
      }
      
      this.editor.off('change', this.changeHandler)
    }
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
