<template>
  <li @click="toggle">
    <div class="header">
      <el-button size="mini" type="primary">详情</el-button>
      <el-button size="mini" type="info">编辑</el-button>
      <el-button size="mini" type="danger">删除</el-button>
    </div>
    <div class="body" :style="{'height': height}">
      <pre>{{ data }}</pre>
    </div>
  </li>
</template>

<script>
export default {
  name: 'DocItem',

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      height: '100px'
    }
  },

  methods: {
    toggle() {
      this.height = this.height === '100px' ? 'auto' : '100px'
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  border: 1px solid #eee;
  overflow: hidden;
  padding: .5rem;
  cursor: pointer;

  + li {
    margin-top: 1.5rem;
  }

  .header {
    text-align: right;
  }

  .body {
    will-change: height;
    transition: all ease-in-out .3s;
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
    padding: .5rem;

    ::-webkit-scrollbar {
      width: 3px !important;
    }
  }
}
</style>

