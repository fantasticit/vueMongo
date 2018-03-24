<template>
  <div
    class="split-panel__panel"
    :class="'is-' + type">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Panel',

  props: {
    type: {
      default: 'horizontal',
      validator: function (type) {
        return ['horizontal', 'vertical'].indexOf(type) > -1
      }
    }
  }
}
</script>

<style>
.split-panel__panel {
  position: absolute;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.split-panel__panel > * {
  height: 100%;
}
</style>
