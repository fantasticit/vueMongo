<template>
  <div class="page">
    <!-- S 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ db }} (数据库)</el-breadcrumb-item>
        <el-breadcrumb-item>{{ collection }} (集合)</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- E 面包屑 -->

    <!-- S 查询工具条 -->
    <div class="filter">
      <ul>
        <li><el-button size="small" type="primary">新增</el-button></li>
        <li><el-button size="small" type="success">索引</el-button></li>
      </ul>
      
      <ul>
        <li><el-button size="small" type="warning" @click="openQueryModal">查询</el-button></li>
      </ul>

      <!-- query 弹窗 -->
      <el-dialog
        title="文档查询"
        :visible="showQueryModal"
        width="50%"
        :before-close="() => this.showQueryModal = false">
        <div>
          <JSONEditor v-model="query" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="showQueryModal = false">取 消</el-button>
          <el-button size="small" type="primary" @click="fetchData">查 询</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- E 查询工具条 -->

    <!-- S 查询数据展示 -->
    <ul ref="content" class="content" v-loading.lock="loading">
      <p v-if="data.length <= 0 && !loading">暂无数据</p>
      <DocItem
        v-for="(item, i) in data"
        :key="i"
        :index="page > 1 ? ((page - 1) * pageSize) + i + 1 : i + 1" 
        :data="item"
      />
    </ul>
    <!-- E 查询数据展示 -->

    <!-- S 分页 -->
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
    <!-- E 分页 -->
  </div>
</template>

<script>
import Connect from '../../api/connect';
import DocItem from './doc-item';
import JSONEditor from '../json-editor';

export default {
  components: {
    DocItem,
    JSONEditor
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
      showQueryModal: false,
      query: '', // 查询语句
    }
  },

  watch: {
    '$route'() {
      console.log('路由更新');
      const { db, collection } = this.$route.params;
        console.log(`/db/${db}/collection/${collection}`);
      this.watchRouter();
    },

    page() {
      this.findAll();
    },

    pageSize() {
      this.findAll();
    },
  },

  crteated() {
    console.log('进去');
    this.watchRouter();
  },

  updated() {
    console.log('更新');
  },

  methods: {
    watchRouter() {
      const { db, collection } = this.$route.params
      this.db = db;
      this.collection = collection;
      this.query = '';
      this.fetchData();
    },

    async fetchData() {
      this.loading = true;
      this.data = [];
      this.showQueryModal = false;

      try {
        const { db, collection } = this.$route.params;
        const data = await Connect.findAll(db, collection, this.query, this.page, this.pageSize)
        this.data = data.docs;
        this.total = data.total;
      } catch (err) {
        this.$message.error(err.message)
      } finally {
        this.loading = false;
      }
    },

    handleSizeChange(val) {
      this.pageSize = val;
    },

    handleCurrentChange(val) {
      this.page = val;
    },

    openQueryModal() {
      this.showQueryModal = true;
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  height: calc(100vh - 50px);
  padding: 15px;
}

div.breadcrumb,
div.filter,
div.paginator {
  height: 30px;
  display: flex;
  align-items: center;
}

div.breadcrumb {
  // margin: 0 0 15px 0;
}

div.paginator {
  height: 40px;
  justify-content: flex-end;
  padding: 0 15px 0 0;
}

div.filter {
  height: 40px;
  margin: 7.5px 0;
  padding: 0 15px 0 0;

  justify-content: space-between;

  ul {
    list-style: none;
    font-size: 0;
  }

  li {
    display: inline-block;

    + li {
      .el-button {
        border-left: 0;
      }
    }
  }

  .el-button {
    border-radius: 0;
  }
}

ul.content {
  width: 100%;
  height: calc(100% - 125px);
  overflow: auto;
  padding: 0 15px 0 0;

  p {
    text-align: center;
    margin: 50px 0;
    font-size: 24px;
    color: #73879C;
  }
}

.json-editor {
  width: 400px;
  height: 400px;
}
</style>
