<template>
  <header>
    <div class="container">
      <button @click="() => this.showConnectModal = true">
        <icon type="add" />
        <span>连接</span>
      </button>
    </div>
    
    <el-dialog title="创建连接" :close-on-click-modal="false" :visible.sync="showConnectModal">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="连接名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入要连接的数据库"></el-input>
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
        <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </div>
    </el-dialog>
  </header>
</template>

<script>
export default {
  name: 'Header',

  data() {
    return {
      isCollapse: false,
      showConnectModal: false,
      ruleForm: {
        name: 'elapse', // 
        url: 'mongodb://zx:zx123@127.0.0.1' // mongodb://zx:zx123@127.0.0.1,
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
    // if (this.$store.state.connect.connections.length <= 0) {
    //   this.showConnectModal = true;
    // }
  },

  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit('toggleCollapse');
    },

    toggleModal() {
      this.showConnectModal = !this.showConnectModal;
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
      this.showConnectModal = false;
    },

    addConnect() {
      this.$store.dispatch('addConnect', {
        connect: this.ruleForm,
        isReconnect: this.isReconnect
      })
        .then(_ => {
          this.showConnectModal = false;
          this.$message.success('连接成功');
        })
        .catch(err => this.$message.error(err.message))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../theme/index.scss';

header {
  height: $padding * 3;
  padding: 0 $padding;
  background: $bg-header;

  // border-bottom: 1px solid $border;
  color: #fff;
  font-size: 1.1em;
  
  @include flexLayout(space-between);

  div.container {
    @include flexLayout(space-between) {
      align-items: center;
    };

    button {
      padding: 4px 10px;
      outline: none;
      color: #fff;
      background: $primary;
      border-radius: 3px;
      border: 1px solid $primary;
      cursor: pointer;
      @include flexLayout(space-between) {
        align-items: center;
      };

      svg {
        font-size: 1.1em;
        margin-right: 6px;
      }

      span {
        font-size: .9em;
        transform: translateY(-1px);
      }
    }
  }
}


</style>
