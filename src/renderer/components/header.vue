<template>
  <header>
    <ul>
      <li @click="toggleModal">
        <div>
          <i class="el-icon-sort"></i>
          <p>连接</p>
        </div>
      </li>
    </ul>
    <el-dialog title="新建连接" :visible.sync="showModal">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="连接名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="连接地址" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
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
      showModal: false,
      ruleForm: {
        name: 'elapse',
        url: 'mongodb://zx:zx123@127.0.0.1',
      },
      rules: {
        name: [
          { required: true, message: '请输入连接名称', trigger: 'blur' },
        ],
        url: [
          { required: true, message: '请输入连接地址', trigger: 'blur' },
        ],
      }
    }
  },

  methods: {
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
      this.$store.dispatch('addConnect', this.ruleForm)
        .then(_ => this.showModal = false)
        .catch(err => console.log(err))
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  // background: #495060;
  // color: #fff;
  height: 5rem;

  ul {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  li {
    height: 100%;
    padding: 2rem;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;

    i {
      font-size: 2rem;
    }
  }
}
</style>

