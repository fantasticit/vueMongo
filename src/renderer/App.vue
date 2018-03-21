<template>
  <div id="app">
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

* {
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: 0px;
    background: hsla(0, 0, 100%, .6);
  }

  ::-webkit-scrollbar-track {
    border-radius: 0px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background:rgba(95, 95, 95, 0.4);
  }
}
</style>
