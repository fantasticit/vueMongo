<template>
  <div id="app">
    <div class="helper">
      <!-- <pre>{{ this.$router.currentRoute.path }}</pre> -->
    </div>
    <router-view class="wrapper"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'visual-mongo',

  computed: {
    ...mapState({
      connections: state => state.connect.connections
    })
  },
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html, body, ul, p, h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Lato","Helvetica Neue",Helvetica,Arial,sans-serif;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;

  > .wrapper {
    flex: 1;
  }
}

.helper {
  position: fixed;
  bottom: 0;
  // left: 50%;
  // transform: translateX(-50%);
  z-index: 10000;

  height: 30px;
  background: #fff;
}
</style>
