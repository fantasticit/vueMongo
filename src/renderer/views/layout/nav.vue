<template>
  <nav>
    <div class="menu-container">
      <p class="title">
        <span>数据库连接</span>
      </p>
      <div>
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
    height: 39px;
    line-height: 39px;
    padding-left: 20px;
  }

  .menu-container {
    height: calc(100% - 60px);
    overflow: hidden;
    font-size: 1em;

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
