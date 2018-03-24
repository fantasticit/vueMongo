<template>
  <div class="page">
    <!-- S 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/db/${this.$route.params.db}/` }">
          {{ this.$route.params.db }} (数据库)
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.params.collection }} (集合)</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- E 面包屑 -->

    <!-- S 查询工具条 -->
    <div class="filter">
      <ul>
        <li>
          <el-button
            size="small"
            type="primary"
            @click="() => this.showInsertModal = true">
            新增
          </el-button>
        </li>
        <!-- <li><el-button size="small" type="success">索引</el-button></li> -->
      </ul>
      
      <ul>
        <li>
          <el-button
            size="small"
            type="warning"
            @click="() => this.showQueryModal = true">
            查询
          </el-button>
        </li>
        <li>
          <el-button
            size="small"
            type="danger"
            @click="reset">
            重置
          </el-button>
        </li>
      </ul>

      <!-- query 弹窗 -->
      <el-dialog
        title="文档查询"
        :visible="showQueryModal"
        :close-on-click-modal="false"
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

      <!-- 新增文档 -->
      <el-dialog
        title="新增文档"
        :visible="showInsertModal"
        :close-on-click-modal="false"
        width="50%"
        :before-close="() => this.showInsertModal = false">
        <div>
          <JSONEditor v-model="newDocument" />
          <!-- <el-input type="textarea" @input="test($event)" :value="JSON.stringify(newDocument)"></el-input> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="showInsertModal = false">取 消</el-button>
          <el-button size="small" type="primary" :loading="loadingBtn" @click="insertNewDocument">新 增</el-button>
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
        @delete="deleteDocument($event)"
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
import Connect from '@/api/connect';
import DocItem from './doc-item';
import JSONEditor from '@/components/json-editor.vue';

export default {
  components: {
    DocItem,
    JSONEditor
  },

  beforeRouteUpdate(to, from, next) {
    this.query = {};
    this.newDocument = {};
    next();
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
      loadingBtn: false,
      showQueryModal: false,
      showInsertModal: false,
      query: {}, // 查询语句
      newDocument: {}, // 新增文档
    }
  },

  watch: {
    '$route'() {
      this.fetchData();
    },

    page() {
      this.fetchData();
    },

    pageSize() {
      this.fetchData();
    },
  },

  created() { 
    this.fetchData();
  },


  methods: {
    async fetchData() {
      this.loading = true;
      this.data = [];
      this.showQueryModal = false;

      try {
        const { db, collection } = this.$route.params;
        const data = await this.$http.query.findAll(db, collection, this.query, this.page, this.pageSize)
        this.data = data.docs;
        this.total = data.total;
      } catch (err) {
        this.$message.error(err.message)
      } finally {
        this.loading = false;
      }
    },

    async insertNewDocument() {
      try {
        try {
          this.newDocument = JSON.parse(this.newDocument)
        } catch (err) {
          throw new Error('请写入json格式数据');
        }

        if (Object.keys(this.newDocument).length <= 0) {
          this.showInsertModal = false
          return
        }

        this.loadingBtn = true;
        const { db, collection } = this.$router.currentRoute.params;
        await this.$http.query.insert(db, collection, this.newDocument);
        this.$message.success('数据更新成功');
        this.fetchData();
      } catch (err) {
        this.$message.error(err.message);
      } finally {
        this.loadingBtn = false;
      }
    },

    async deleteDocument(id) {
      const { db, collection } = this.$route.params;

      try {
        await this.$http.query.deleteById(db, collection, id);
        this.fetchData(); // 删除数据后重新获取数据
        this.newDocument = {};
      } catch (err) {
        this.$message.error(err.message);
      }
    },

    reset() {
      this.query = {};
      this.newDocument = {};
      this.page = 1;
      this.pageSize = 20;

      this.fetchData();
    },

    handleSizeChange(val) {
      this.pageSize = val;
    },

    handleCurrentChange(val) {
      this.page = val;
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
