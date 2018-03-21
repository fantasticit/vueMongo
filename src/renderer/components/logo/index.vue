<template>
  <div class="logo">
    <img :src="logo" alt="logo">
    <span>{{ name }}</span>
  </div>
</template>

<script>
import logo from './logo.svg';

export default {
  name: 'Logo',

  components: {},

  data() {
    return {
      logo: logo,
      name: 'MongoVisual',
    }
  },
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;

  img {
    width: 48px;
    height: 48px;
  }
}
</style>

