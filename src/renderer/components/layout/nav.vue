<template>
  <nav>
    <div class="logo-container">
      <Logo />
    </div>
    <div class="menu-container">
      <p class="title">数据库</p>
      <div class="">
        <Navmenun v-for="(item, i) in connections" :key="i" :data="item" />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import Navmenun from './navmenu';
import Logo from '../logo';

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
    background: #334556;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
  }

  .menu-container {
    height: calc(100% - 60px);
    overflow: hidden;

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
