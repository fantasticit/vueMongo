<template>
  <li @click.stop="toggle">
    <div class="header">
      <div class="info">
        <span>{{ index }}</span>
      </div>
      <div class="operator">
        <el-button @click.stop="toggle" size="mini" type="primary">
          {{ height === '100px' ? '展开' : '收起' }}
        </el-button>
        <el-button @click.stop="copyToClipboard" size="mini">复制</el-button>
        <el-button @click.stop="edit" size="mini" type="info">编辑</el-button>
        <el-button @click.stop="deleteDocument" size="mini" type="danger">删除</el-button>
      </div>
    </div>
    <div class="body" :style="{'height': height}" ref="code">
      <pre><code>{{ data }}</code></pre>
      <!-- <el-scrollbar></el-scrollbar> -->
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
    this.highlight();
  },

  updated() {
    this.highlight();
  },

  methods: {
    toggle() {
      this.height = this.height === '100px' ? 'auto' : '100px'
    },

    edit() {
      const id = this.data._id

      if (!id) {
        this.$message.info('未能找到 _id 属性，无法编辑');
        return
      } else {
        const { db, collection } = this.$route.params;
        this.$router.push(`/db/${db}/collection/${collection}/document/${id}`)
      }
    },

    async deleteDocument() {
      const id = this.data._id

      if (!id) {
        this.$message.info('未能找到 _id 属性，无法删除');
        return
      } else {
        this.$emit('delete', id);
      }
    },

    copyToClipboard() {
      try {
        const dummyTextArea = document.createElement('textarea')
        dummyTextArea.textContent = JSON.stringify(this.data)
        document.body.appendChild(dummyTextArea)
        dummyTextArea.select()
        document.execCommand('copy')
        document.body.removeChild(dummyTextArea)

        this.$message.success('内容已成功复制到剪切板');
      } catch (err) {
        console.log(err);
        this.$message.error('复制失败');
      }
    },

    highlight() {
      this.$nextTick(_ => {
        let el = this.$refs['code'];
        if (!el) {
          return
        }

        let blocks = el.querySelectorAll('pre code');
        blocks.forEach((block) => {
          Hljs.highlightBlock(block);
        });
      })
    },
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
  // font-size: 0;

  + li {
    margin-top: 1.5rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 1em;
  }

  .body {
    will-change: height;
    transition: all ease-in-out .3s;
    font-size: 1em;
    margin-top: $padding;
  }

  pre {
    display: block;
    height: 100%;
    background: #f5f8fa;
    border-color: 1px solid #e3eaee;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
    padding: $padding;
    margin: 0;

    code {
      background: transparent;
      overflow: hidden;
    }
  }
}
</style>

