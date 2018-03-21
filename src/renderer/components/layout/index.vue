<template>
  <div class="container" :class="{ 'is-collapse': isCollapse }">
    <Nav :class="{ 'is-collapse': isCollapse }" />
    <main>
      <Header @toggleCollapse="toggleCollapse" />
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Nav from './nav';
import Header from './header';

export default {
  name: 'Layout',

  components: {
    Nav,
    Header,
  },

  data() {
    return {
      isCollapse: false,
    }
  },

  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
}
</script>

<style lang="scss" scoped>
div.container {
  position: relative;
  padding-left: 200px;
  transform: all .2s ease .1s;

  nav {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    background: rgb(73, 80, 96);
    color: #fff;

    transition: all ease .3s;
  }

  nav.is-collapse {
    transform: translateX(-100%);
  }

  main {
    width: 100%;
    height: 100%;
  }
}

div.container.is-collapse {
  padding-left: 0;
}
</style>
