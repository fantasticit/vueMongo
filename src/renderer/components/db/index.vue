<template>
  <div class="page" v-loading.lock="loading">
    <!-- S 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.params.db }} (数据库)</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- E 面包屑 -->

    <!-- <pre>{{ data }}</pre> -->
      
    <div class="content">
      <el-table
        :data="data"
        stripe
        border
        style="width: 100%"
        max-height="600">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item v-for="(item, i) in Object.keys(props.row)" :key="i" :label="item">
                <span>{{ props.row[item] }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="ns"
          label="集合">
        </el-table-column>
        <el-table-column
          prop="size"
          label="大小（Bytes）">
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">导出</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DB',

  data() {
    return {
      loading: false,
      data: [],
    }
  },

  watch: {
    '$route'() {
      this.fetchData()
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.loading = true;

      try {
        const data = await this.$http.connect.getDBCollectionStats(this.$route.params.db);
        this.data = data;
      } catch (err) {
        this.$message.error(err.message)
      } finally {
        this.loading = false;
      }
    },

    edit(a, collection) {
      collection = collection.ns.split('.').slice(1).join('.')
      this.$router.push(`/db/${this.$route.params.db}/collection/${collection}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  height: calc(100vh - 50px);
  padding: 15px;
}

.content {
  padding: 7.5px 0;
}

div.breadcrumb,
div.filter,
div.paginator {
  height: 30px;
  display: flex;
  align-items: center;
}

/deep/ .table-expand {
  font-size: 0;

  label {
    width: 100px;
    color: #99a9bf;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
