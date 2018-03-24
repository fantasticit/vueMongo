<template>
  <div id="app">
    <!-- <div class="helper"> -->
      <!-- <pre>{{ this.$router.currentRoute.path }}</pre> -->
    <!-- </div> -->
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
      connections: state => state.connect.connections
    })
  },
}
</script>

<style lang="scss">
@import './theme/index.scss';

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;

  .view {
    height: calc(100% - 85px);
  }
}
</style>
