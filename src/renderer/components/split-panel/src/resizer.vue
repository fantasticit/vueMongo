<template>
	<div
    class="split-panel__resizer"
    :class="type === 'horizontal' ? 'for-horizontal' : 'for-vertical'"
    @mousedown="emitMousedown($event)">
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    type: {
      validator(value) {
        return ['vertical', 'horizontal'].indexOf(value) >= 0
      },
      default: 'vertical'
    },
  },

  methods: {
    emitMousedown(e) {
      this.$emit('mousedown', e)
    },
  }
}
</script>

<style scoped>
.split-panel__resizer {
	position: absolute;
	opacity: .2;
	z-index: 1;
  box-sizing: border-box;
	background: #999;
	background-clip: padding-box;
}

.split-panel__resizer.for-vertical {
  width: 100%;
  height: 11px;
	margin: -5px 0;
	border-top: 5px solid rgba(255, 255, 255, 0);
	border-bottom: 5px solid rgba(255, 255, 255, 0);

  cursor: row-resize;
}

.split-panel__resizer.for-horizontal {
  width: 11px;
	height: 100%;
	margin-left: -5px;
	border-left: 5px solid rgba(255, 255, 255, 0);
	border-right: 5px solid rgba(255, 255, 255, 0);

  cursor: col-resize;
}
</style>
