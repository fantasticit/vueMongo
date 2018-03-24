<template>
  <div class="container" :class="{ 'is-collapse': isCollapse }">
    <Nav :class="{ 'is-collapse': isCollapse }" />
    <main>
      <!-- <Header @toggleCollapse="toggleCollapse" /> -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Bus from '@/bus';
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

  created() {
    Bus.$on('toggleNav', () => this.isCollapse = !this.isCollapse);
  },

  methods: {
  },
}
</script>

<style lang="scss" scoped>
@import '../../theme/index.scss';

div.container {
  position: relative;
  padding-left: 240px;
  transition: all ease .3s;

  nav {
    position: absolute;
    left: 0;
    top: 0;
    width: 240px;
    height: 100%;
    // background: #2c3e50;
    // color: #fff;
    overflow: auto;

    box-shadow: $shadow;

    transition: all ease .3s;
  }

  nav.is-collapse {
    transform: translateX(-100%);
    transition-delay: .1s;
    box-shadow: none;
  }

  main {
    width: 100%;
    height: 100%;
  }
}

div.container.is-collapse {
  padding-left: 0;
  transition-delay: .1s;
}
</style>
