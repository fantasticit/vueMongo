<template>
  <li @click="toggle">
    <div class="header">
      <div class="info">
        <span>{{ index }}</span>
      </div>
      <div class="operator">
        <el-button size="mini" type="primary">详情</el-button>
        <el-button size="mini" type="info">编辑</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </div>
    </div>
    <div class="body" :style="{'height': height}" ref="code">
      <pre>{{ data }}</pre>
    </div>
  </li>
</template>

<script>
import Hljs from 'highlight.js';

export default {
  name: 'DocItem',

  props: {
    data: {
      type: Object,
      default: () => {}
    },

    index: {
      type: Number,
      default: 0
    },
  },

  data() {
    return {
      height: '100px'
    }
  },

  mounted() {
    console.log('mount');
    this.highlight();
  },

  updated() {
    console.log('update');
    this.highlight();
  },

  methods: {
    toggle() {
      this.height = this.height === '100px' ? 'auto' : '100px'
    },

    highlight() {
      setTimeout(_ => {
        let el = this.$refs['code'];
        let blocks = el.querySelectorAll('pre code');
        blocks.forEach((block) => {
          Hljs.highlightBlock(block);
        });
      }, 0)
    }
  },
}
</script>

<style lang="scss" scoped>
$padding: .5rem;

li {
  position: relative;
  border: 1px solid #eee;
  overflow: hidden;
  padding: $padding;
  cursor: pointer;
  font-size: 0;

  + li {
    margin-top: 1.5rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 14px;
  }

  .body {
    will-change: height;
    transition: all ease-in-out .3s;
    font-size: 14px;
    margin-top: $padding;
  }

  pre {
    display: block;
    height: 100%;
    background: #f5f8fa;
    border-color: 1px solid #e3eaee;
    word-break: break-all;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    padding: $padding;
    margin: 0;

    code {
      background: transparent;
    }
  }
}
</style>

