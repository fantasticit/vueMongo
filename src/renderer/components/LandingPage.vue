<template>
  <div class="container">
    <aside>
      <div class="logo">待定</div>
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

export default {
  components: {
    TreeList,
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
  padding-left: 300px;

  aside {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 100%;
    background: #2c3e50;
    color: #fff;
  }

  main {
    width: 100%;
    height: 100%;
  }
}
</style>

