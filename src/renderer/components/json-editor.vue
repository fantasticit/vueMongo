<template>
  <div class="json-editor">
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
// require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

export default {
  name: 'jsonEditor',

  data() {
    return {
      jsonEditor: false
    }
  },

  props: ['value'],

  watch: {
    value(value) {
      const editor_value = this.jsonEditor.getValue()
      if (value !== editor_value) {
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
      }
    }
  },

  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'eclipse',
      lint: true
    })

    this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    this.jsonEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },

  methods: {
    getValue() {
      return this.jsonEditor.getValue()
    }
  }
}
</script>

<style scoped>
.json-editor{
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid #eee;
   caret-color: red !important;
}
.json-editor >>> .CodeMirror {
  height: 100%;
  min-height: 300px;
}
.json-editor >>> .CodeMirror-scroll{
  min-height: 300px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}

/* .json-editor >>> .cm-s-rubyblue.CodeMirror {
  background: #fff;
}

.json-editor >>> .cm-s-rubyblue .CodeMirror-gutters{
  background: #f5f8fa;
  border-right-width: 1px;
  border-right-color: #eee;
}

.json-editor >>> .CodeMirror-code {
  color: #333;
  font-weight: 600;
}

.json-editor >>> .cm-s-rubyblue .CodeMirror-linenumber {
  color: #666;
}

/* 光标 */
/* .json-editor >>> .cm-s-rubyblue .CodeMirror-cursor {
  border-color: #000;
} */
</style>
