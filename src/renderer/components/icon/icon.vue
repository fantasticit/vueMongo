<template>
  <svg>
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
export default {
  name: 'Icon',

  props: {
    type: {
      default: 'sad'
    },
  },

  computed: {
    iconName() {
      return '#' + this.$props.type
    }
  }
}
</script>

<style scoped>
svg {
  fill: currentColor;
  overflow: hidden;

  width: 1em;
  height: 1em;
}
</style>
