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
      scrollbarStyle: 'null',
      mode: 'javascript',
      autoCloseBrackets: true,
      matchBrackets: true,
      mongodb: {
        fields: {
          _id: 'ObjectId',
          name: 'String',
          age: 'Number',
          number_of_pets: 'Number',
          addresses: 'Array',
          'addresses.street': 'String'
        }
      },
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
  width: 100% !important;
  height: 100%;
  position: relative;
  border: 1px solid #eee;
}
.json-editor >>> .CodeMirror {
  width: 100% !important;
  height: 100%;
  min-height: 300px;
}
.json-editor >>> .CodeMirror-scroll{
  min-height: 300px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>
