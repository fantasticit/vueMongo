<template>
  <div class="container">
    <aside>
      <div class="logo">
        <Logo />
      </div>
      <TreeList v-for="(item, i) in connections" :key="i" :data="item" />
    </aside>
    <main>
      <MyHeader />
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import TreeList from './tree';
import { mapState } from 'vuex';
import Logo from './logo';

export default {
  components: {
    TreeList,
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
div.container {
  position: relative;
  padding-left: 200px;

  aside {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    background: rgb(73, 80, 96);
    color: #fff;
  }

  main {
    width: 100%;
    height: 100%;
  }
}
</style>

