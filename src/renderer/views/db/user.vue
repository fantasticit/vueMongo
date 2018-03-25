<template>
  <div class="page">
    <!-- S 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/db/${this.$route.params.db}/` }">
          {{ this.$route.params.db }} (数据库)
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- E 面包屑 -->

    <div class="toolbar">
      <div>
        <el-button type="danger" size="mini" @click="deleteUser">删除用户</el-button>
        <el-button type="info" size="mini" @click="goback">返回上一页</el-button>
      </div>
      <el-button type="primary" size="mini" @click="() => this.showModal = true">新增用户</el-button>
      <el-dialog title="新建用户" :visible.sync="showModal" :close-on-click-modal="false">
        <el-form label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="用户姓名" prop="user">
            <el-input type="text" auto-complete="off" v-model="ruleForm.user"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="passwd">
            <el-input type="password" auto-complete="off" v-model="ruleForm.passwd"></el-input>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-input type="text" auto-complete="off" v-model="ruleForm.roles" placeholder="多个角色请用空格分隔"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
            <el-button type="primary" size="small" @click="submitForm('ruleForm')">创建用户</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <div class="content">
      <el-table
        ref="multipleTable"
        :data="users"
        tooltip-effect="dark"
        style="width: 100%"
        border
        max-height="600"
        @selection-change="setSelectedUsers"
        >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="user"
          label="用户"
          width="120">
        </el-table-column>
        <el-table-column
          prop="roles"
          label="角色"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',

  data() {
    return {
      users: [],
      showModal: true,
      ruleForm: {
        user: '',
        passwd: '',
        roles: '',
      },
      rules: {
        user: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
        ],
        passwd: [
          { required: true, message: '请输入用户密码', trigger: 'change' }
        ],
      }
    }
  },

  created() {
    this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      this.showModal = false;
      this.$loading.start();

      try {
        const data = await this.$http.user.getUsers(this.$route.params.db);
        data.forEach(user => {
          user.roles = user.roles.map(role => role.role).join('、');
        })
        this.users = data;
      } catch (err) {
        this.$message.error(err.message);
      } finally {
        this.$loading.close();
      }
    },

    async createUser() {
      const user = {
        user: this.ruleForm.user,
        pwd: this.ruleForm.passwd,
      };

      if (this.ruleForm.roles.length > 0) {
        const roles = this.ruleForm.roles.split(' ').map(role => ({
          db: this.$route.params.db,
          role,
        }));

        user.roles = roles;
      }

      try {
        await this.$http.user.createUser(this.$route.params.db, user);
        this.resetForm('ruleForm');
        this.$message.success('创建用户成功');
        this.fetchUsers();
      } catch (err) {
        this.$message.error(err.message);
      }
    },

    async deleteUser(users) {
      try {
        const users = this.selectedUsers.map(user => user.user);
        await this.$http.user.deleteUser(this.$route.params.db, users);
        this.$message.success('用户已删除');
        this.fetchUsers();
      } catch (err) {
        this.$message.error(err.message);
      }
    },

    setSelectedUsers(users) {
      this.selectedUsers = users;
    },

    cancelSelectedUser() {
      this.selectedUsers = [];
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createUser();
        } else {
          return false;
        }
      });
    },

    resetForm(formName) {
      this.showModal = false;
      this.$refs[formName].resetFields();
    },

    goback() {
      this.$router.go(-1);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../theme/index.scss';

.toolbar,
.content {
  padding: 0 $padding !important;
}

.content {
  height: calc(100% - 95px) !important;
  
  /deep/ .el-table {
    height: 100%;
  }
}
</style>
