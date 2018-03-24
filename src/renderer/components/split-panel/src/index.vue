<template>
  <div
    class="split-panel" ref="split"
    @mousemove="handleMousemove($event)"
    @mouseup="handleMouseup($event)"
    :style="activeStyle">

    <panel
      :style="[
        type === 'horizontal'
          ? {'width': nowPercent + '%', 'left': '0%'}
          : {'width': '100%', 'height': nowPercent + '%', 'top': '0%'}
      ]">
      <slot name="first"></slot>
    </panel>

    <Resizer
      :type="type"
      :style="[
        type === 'horizontal'
          ? {'left': nowPercent + '%'}
          : {'top': nowPercent + '%'}
      ]"
      @mousedown="handleMousedown($event)"
    />

    <panel
      :style="[
        type === 'horizontal'
          ? {'width': 100 - nowPercent + '%', 'left': nowPercent + '%'}
          : {'width': '100%', 'height': 100 - nowPercent + '%', 'top': nowPercent + '%'}
      ]">
      <slot name="second"></slot>
    </panel>
  </div>
</template>

<script>
import Panel from './panel.vue'
import Resizer from './resizer.vue'

export default {
  name: 'SplitPanel',

  components: {
    Panel,
    Resizer
  },

  props: {
    type: {
      default: 'vertical',
      validator: function (type) {
        return ['horizontal', 'vertical'].indexOf(type) > -1
      }
    },

    min: {
      type: Number,
      default: 0
    },

    percent: {
      type: Number,
      default: 50
    },

    max: {
      type: Number,
      default: 100
    }
  },

  data() {
    return {
      nowPercent: this.percent,
      isMousedown: false,
      activeStyle: {}
    }
  },

  methods: {
    handleMousedown(e) {
      this.isMousedown = true
      this.activeStyle = {
        userSelect: 'none',
        cursor: this.type === 'horizontal'
          ? 'col-resize'
          : 'row-resize'
      }

      document.addEventListener('mouseup', () => {
        this.handleMouseup()
      }, !1)
    },

    handleMousemove(e) {
      if (!this.isMousedown) {
        return
      }

      let target = e.currentTarget
      let offset = 0

      if (this.type === 'horizontal') {
        while (target) {
          offset += target.offsetLeft
          target = target.offsetParent
        }
      } else {
        while (target) {
          offset += target.offsetTop
          target = target.offsetParent
        }
      }

      let offsetPercent = (this.type === 'horizontal'
        ? (e.pageX - offset) / e.currentTarget.offsetWidth
        : (e.pageY - offset) / e.currentTarget.offsetHeight
      ) * 100

      if (offsetPercent >= this.min && offsetPercent <= this.max) {
        this.nowPercent = offsetPercent
      }
    },

    handleMouseup() {
      this.isMousedown = false
      this.activeStyle = {}
    }
  }
}
</script>

<style>
.split-panel {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
