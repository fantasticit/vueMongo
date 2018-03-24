<template>
  <header>
    <div class="container">
      <div>
        <button @click="() => this.showConnectModal = true">
          <icon type="add" />
          <span>连接</span>
        </button>
      </div>

      <div>
        <span @click="love"><icon type="love" /></span>
      </div>
    </div>
    
    <el-dialog title="创建连接" :close-on-click-modal="false" :visible.sync="showConnectModal">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="数据库" prop="database">
          <el-input v-model="ruleForm.database" placeholder="请输入连接数据库"></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="ruleForm.user" placeholder="请输入用户帐号"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="ruleForm.pwd" type="password" placeholder="请输入用户密码"></el-input>
        </el-form-item>
        <el-form-item label="连接地址" prop="url">
          <el-input v-model="ruleForm.url" placeholder="请输入连接地址"></el-input>
        </el-form-item>
        <el-form-item label="连接端口">
          <el-input v-model="ruleForm.port" placeholder="请输入连接端口"></el-input>
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
        database: '', //
        user: '',
        pwd: '',
        url: '127.0.0.1',
        port: 27017
      },
      rules: {
        database: [
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
      const connect = {
        name: this.ruleForm.database
      }

      if (this.ruleForm.user && this.ruleForm.pwd) {
        connect.url = 'mongodb://' + 
                      this.ruleForm.user + ':' + this.ruleForm.pwd +
                      '@' + this.ruleForm.url + ':' + this.ruleForm.port
                       
      } else {
        connect.url = 'mongodb://' +  this.ruleForm.url + ':' + this.ruleForm.port
      }

      this.$store.dispatch('addConnect', {
        connect: connect,
        isReconnect: this.isReconnect
      })
        .then(_ => {
          this.showConnectModal = false;
          this.$message.success('连接成功');
        })
        .catch(err => this.$message.error(err.message))
    },

    love() {
      const {shell} = require('electron').remote;
      shell.openExternal('https://github.com/mvpzx/mongo-visual')
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../theme/index.scss';

header {
  height: $padding * 3 + 5;
  padding: 0 $padding;
  background: $bg-header;

  // border-bottom: 1px solid $border;
  color: #fff;
  font-size: 1.1em;
  
  @include flexLayout(space-between);

  div.container {
    width: 100%;
    @include flexLayout(space-between) {
      align-items: center;
    };

    > div {
      flex: 1;
      color: $text-color;

      + div {
        text-align: right;
      }
    }

    svg {
      cursor: pointer;
      font-size: 1.1em;
      color: #909090;

      &:hover {
        color: #fff;
      }
    }

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
        margin-right: 6px;
        color: #fff;
      }

      span {
        font-size: .9em;
        transform: translateY(-1px);
      }
    }
  }
}


</style>
