/**
 * 代码高亮指令
 */
import Vue from 'vue'
import Hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

let Highlight = {}
Highlight.install = (vue, options) => {
  Vue.directive('highlight', (el) => {
    setTimeout(() => {
      let blocks = el.querySelectorAll('pre code');
      blocks.forEach((block) => {
        Hljs.highlightBlock(block);
      });
    }, 0);
  })
}

export default Highlight
