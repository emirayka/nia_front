<template>
  <div
    class="nia-code-editor"
  >
    <div
      class="nia-code-editor__scrollbar__codemirror"
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
  import {Prop, Watch} from 'vue-property-decorator'

  import _ from 'underscore'

  @Component({
    name: 'NiaCodeEditor',
  })
  export default class NiaCodeEditor extends Vue {
    editor: codemirror.Editor | null = null
    changeHandler: ((instance: codemirror.Editor, changeObj: codemirror.EditorChangeLinkedList) => void) | null = null

    @Prop({ required: true })
    code!: string;

    @Prop({ default: true })
    enabled!: boolean;

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
        "Ctrl-Enter": _.throttle((instance: CodeMirror.Editor) => {
          let selectedCode = instance.getSelection()

          if (selectedCode === '') {
            selectedCode = instance.getValue()
          }

          this.$emit('execute', selectedCode)
        }, 1000),
        "Tab": function (instance: CodeMirror.Editor) {
          const indentUnit: number = instance.getOption("indentUnit") || 2
          const spaces: string = Array(indentUnit + 1).join(" ");

          instance.replaceSelection(spaces);
        },
      });

      this.editor?.setOption('readOnly', !this.enabled)
      this.editor?.setSize('100%', '100%')

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

    @Watch('enabled')
    enabledChanged(value: boolean): void {
      this.editor?.setOption('readOnly', !value)
    }
  }
</script>

<style
  scoped
  lang="scss"
>
  .nia-code-editor {
    height: 100%;
  }

  .nia-code-editor__scrollbar__codemirror {
    height: 100%;
  }
</style>
