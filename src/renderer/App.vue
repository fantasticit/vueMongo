<template>
  <div id="app" :style="{
    'font-size': fontSize + 'px'
  }" :class="theme">
    <Header />
    <router-view class="view"></router-view>
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default {
  name: 'visual-mongo',

  components: {
    Header,
    Footer,
  },

  computed: {
    ...mapState({
      connections: state => state.connect.connections,
      fontSize: state => state.setting.fontSize,
      theme: state => state.setting.theme,
    }),
  },
}
</script>

<style lang="scss">
@import './theme/index.scss';

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;

  color: $text-color;
  font-size: $text-size;

  .view {
    height: calc(100% - 80px);
  }
}
</style>
