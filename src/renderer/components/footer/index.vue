<template>
  <footer>
    <ul>
      <li @click="toggleNav">
        <icon type="menu" />
      </li>
      <li>
        <icon type="console" />
      </li>
    </ul>

    <ul>
      <li>
        <icon type="welcome" />
      </li>
      <li>
        <icon type="setting" />
      </li>
      <li>
        <icon type="help" />
      </li>
    </ul>
  </footer>
</template>

<script>
import Bus from '@/bus';

export default {
  name: 'Footer',

  methods: {
    toggleNav() {
      Bus.$emit('toggleNav');
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../theme/index.scss';

footer {
  height: $padding * 2 + 10;
  padding: 0 $padding;
  border-top: 1px solid $border;
  color: $text-color;
  font-size: 1.1em;

  @include flexLayout(space-between);
}

ul {
  @include flexLayout(space-between) {
    align-items: center;
  };

  li {
    padding: .5em;
    cursor: pointer;
  }
}
</style>
