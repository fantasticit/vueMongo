<template>
  <nav>
    <div class="logo">
      <Logo />
    </div>
    <Navmenun v-for="(item, i) in connections" :key="i" :data="item" />
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
