<template>
  <header>
    <div class="collapse-menu" @click="toggleCollapse">
      <span>
        <icon :type="isCollapse ? 'menu' : 'menu-retract'" />
      </span>
    </div>
    <ul>
      <li @click="toggleModal">
        <icon type="connection" />
        <span>连接</span>
      </li>
    </ul>
    <el-dialog title="新建连接" :visible.sync="showModal" :close-on-click-modal="false">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="连接名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入要连接的数据库名词"></el-input>
        </el-form-item>
        <el-form-item label="连接地址" prop="url">
          <el-input v-model="ruleForm.url" placeholder="请输入形如 mongodb://<user>:<passwd>@<host>:<port> 的URL"></el-input>
        </el-form-item>

        <el-form-item label="断线重连">
          <el-switch
            v-model="isReconnect"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
      </div>
    </el-dialog>
  </header>
</template>

<script>
import Store from '@/store'

export default {
  name: 'Header',
  data() {
    return {
      isCollapse: false,
      showModal: false,
      ruleForm: {
        name: '', // elapse
        url: '' // mongodb://zx:zx123@127.0.0.1,
      },
      rules: {
        name: [
          { required: true, message: '请输入连接名称', trigger: 'blur' },
        ],
        url: [
          { required: true, message: '请输入连接地址', trigger: 'blur' },
        ],
      },
      isReconnect: false, // 重新连接
    }
  },

  created() {
    if (this.$store.state.connect.connections.length <= 0) {
      this.showModal = true;
    }
  },

  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit('toggleCollapse');
    },

    toggleModal() {
      this.showModal = !this.showModal;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addConnect()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.showModal = false;
    },

    addConnect() {
      this.$store.dispatch('addConnect', {
        connect: this.ruleForm,
        isReconnect: this.isReconnect
      })
        .then(_ => {
          this.showModal = false;
          this.$message.success('连接成功');
        })
        .catch(err => this.$message.error(err.message))
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  height: 50px;
  border-bottom: 1px solid #e6e6e6;

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4em;

  .collapse-menu {
    padding: 1rem;
    cursor: pointer;
  }

  ul {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 1rem;
  }

  li {
    height: 100%;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    font-size: 16px;

    svg {
      font-size: 20px !important;
    }

    span {
      margin-left: 2px;
      transform: translateY(-.5px);
    }
  }
}
</style>
