<template>
  <nav>
    <div class="menu-container">
      <p class="title">
        <el-popover
          ref="pop"
          placement="top-start"
          title="提示"
          width="120"
          trigger="hover"
          content="点击连接按钮后，成功连接的数据库会展示在下方">
        </el-popover>
        <span v-popover:pop>数据库连接</span>
      </p>
      <div class="">
        <Navmenun v-for="(item, i) in connections" :key="i" :data="item" />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import Navmenun from './navmenu';
import Logo from '@/components/logo';

export default {
  components: {
    Navmenun,
    Logo
  },

  computed: {
    ...mapState({
      connections: state => state.connect.connections
    })
  },

  data () {
    return {
      defaultProps: {
        children: 'collections',
        label: 'name',
      }
    }
  },

  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
nav {
  overflow: hidden;

  .logo-container {
    height: 60px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .title {
    // background: #334556;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
  }

  .menu-container {
    height: calc(100% - 60px);
    overflow: hidden;
    font-size: 16px;

    > div {
      height: calc(100% - 40px);
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0px;
      }
    }
  }
}
</style>
