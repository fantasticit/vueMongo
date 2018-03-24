<template>
  <div class="page">
    <!-- S 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.params.db }} (数据库)</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- E 面包屑 -->

    <div class="toolbar">
      <el-button type="primary" size="mini" @click="gotoUser">用户管理</el-button>
    </div>

    <div class="collections" v-loading.lock="loading">
      <el-table
        :data="data"
        stripe
        border
        style="width: 100%"
        max-height="800">
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
              @click="exportFile(scope.$index, scope.row)">导出</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteCollection(scope.$index, scope.row)">删除</el-button>
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
        const data = await this.$http.collection.getCollections(this.$route.params.db);
        this.data = data;
      } catch (err) {
        this.$message.error(err.message)
      } finally {
        this.loading = false;
      }
    },

    edit(i, collection) {
      collection = collection.ns.split('.').slice(1).join('.');
      this.$router.push(`/db/${this.$route.params.db}/collection/${collection}`);
    },

    async exportFile(i, collection) {
      const {dialog} = require('electron').remote;
      const db = this.$route.params.db;
      collection = collection.ns.split('.').slice(1).join('.');
      const data = await this.$http.query.findAll(db, collection);

      dialog.showSaveDialog({
        title: '请输入文件名并选择保存位置',
        filters: [
          {name: 'JSON', extensions: ['json', 'js', 'txt']},
        ]
      }, path => {
        if (!path) {
          return
        }

        const fs = require('fs');
        const jsonStringify = require('json-pretty');

        fs.writeFile(path, jsonStringify(data.docs), err => {
          if (err) {
            new Notification('导出失败', { body: '很抱歉，数据导出失败，请重试！'})
          } else {
            new Notification('导出成功', { body: '数据已成功导出至' + path })
          }
        })
      });
    },

    async deleteCollection(i, collection) {
      this.$confirm('数据有变动且未保存，是否保存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showInput: false
        }).then(async () => {
          const db = this.$route.params.db;
          collection = collection.ns.split('.').slice(1).join('.');
          await this.$http.connect.deleteCollection(db, collection);
          this.fetchData();
        }).catch(() => this.$message.info('取消删除'));
    },

    gotoUser() {
      this.$router.push(`/db/${this.$route.params.db}/user`);
    }
  },
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  padding: 15px;
}

.content {
  padding: 7.5px 0;
}

div.breadcrumb,
div.toolbar {
  height: 30px;
  display: flex;
  align-items: center;
}

div.toolbar {
  justify-content: flex-end;
}

.collections {
  height: calc(100% - 60px);
  padding: 15px 0;

  /deep/ .el-table {
    height: 100%;
  }
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
