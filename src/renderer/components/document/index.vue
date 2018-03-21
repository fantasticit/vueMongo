<template>
  <div class="page" v-loading.lock="loading">
    <div class="toolbar">
      <el-row>
        <el-col :span="12">
          <el-button size="small" type="success" @click="goback">返回</el-button>
        </el-col>
        <el-col :span="12" class="text-right">
          <el-button size="small" type="primary">保存</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="editor">
      <JSONEditor v-model="data" />
    </div>
  </div>
</template>

<script>
import JSONEditor from '../json-editor';

export default {
  name: 'Document',

  components: {
    JSONEditor
  },

  data() {
    return {
      loading: false,
      data: {},
    }
  },

  created() {
    this.fetchDocument();
  },

  methods: {
    async fetchDocument() {
      this.loading = true;
      try {
        const { db, collection, document } = this.$router.currentRoute.params;
        const data = await this.$http.query.findById(db, collection, document);
        this.data = data;
      } catch (err) {
        this.$message.error(err.message)
      } finally {
        this.loading = false;
      }
    },

    goback() {
      console.log(2)
      const { db, collection } = this.$router.currentRoute.params;
      this.$router.push(`/db/${db}/collection/${collection}`);
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  height: calc(100vh - 50px);
  padding: 15px;
}

div.toolbar {
  margin-bottom: 15px;
}

.text-right {
  text-align: right;
}

.editor {
  height: 500px;
}
</style>
