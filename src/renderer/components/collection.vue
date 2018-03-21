<template>
  <div class="page">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ db }} (数据库)</el-breadcrumb-item>
        <el-breadcrumb-item>{{ collection }} (集合)</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <ul ref="content" v-loading="loading">
      <DocItem v-for="(item, i) in data" :key="i" :data="item" />
    </ul>
    <div class="paginator">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Hljs from 'highlight.js';
import Connect from '../api/connect';
import DocItem from './doc-item'

export default {
  components: {
    DocItem,
  },

  data() {
    return {
      db: '',
      collection: '',
      data: [],
      page: 1,
      pageSize: 20,
      total: 0,
      loading: false,
    }
  },

  watch: {
    '$route'() {
      this.watchRouter();
    },

    page() {
      this.findAll(this.db, this.collection);
    },

    pageSize() {
      this.findAll(this.db, this.collection);
    },
  },

  crteated() {
    this.watchRouter();
  },

  methods: {
    watchRouter() {
      const { db, collection } = this.$route.params
      this.db = db;
      this.collection = collection;
      this.findAll(db, collection);
    },

    async findAll(db, collection) {
      console.log('diaoyong');
      this.loading = true;
      const data = await Connect.findAll(db, collection, this.page, this.pageSize)
      this.data = data.docs;
      this.total = data.total;
      this.loading = false;
    },

    handleSizeChange(val) {
      this.pageSize = val;
    },

    handleCurrentChange(val) {
      this.page = val;
    }
  },
}
</script>

<style lang="scss" scoped>
.page {
  height: calc(100vh - 50px);
  padding: 15px;
}

div.breadcrumb, div.paginator {
  height: 30px;
  display: flex;
  align-items: center;
}

div.paginator {
  height: 40px;
  justify-content: flex-end;
  padding: 0 1rem 0 0;
}

ul {
  width: 100%;
  height: calc(100% - 70px);
  overflow: auto;
  padding: 0 1rem 0 0;
}
</style>

