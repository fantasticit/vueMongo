<template>
  <transition name="slide-top">
    <div class="logger" ref="logger" @mousemove="handleMousemove($event)"
    @mouseup="handleMouseup($event)">
      <!-- <Resizer @mousedown="handleMousedown($event)" /> -->
      <ul slot="second">
        <li v-for="(error, i) in errors" :key="i">
          <span>{{ error.time | formatTime }}: </span>
          <span class="msg">{{ error.message }}</span>
        </li>
      </ul>
      <p v-if="errors.length <= 0">暂无错误日志</p>
    </div>
  </transition>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import Resizer from './resizer';

export default {
  components: {
    Resizer,
  },

  computed: {
    ...mapState({
      errors: state => state.error.errors
    })
  },

  mounted() {
    let oLogger = this.$refs['logger'];
    oLogger.scrollTop = oLogger.scrollHeight - oLogger.offsetHeight;
  },

  filters: {
    formatTime(time) {
      return moment(time).format('LLLL');
    }
  },

  data() {
    return {
      isMousedown: false,
      nowPercent: 20,
    }
  },

  methods: {
    handleMousedown(e) {
      this.isMousedown = true
      console.log('down');

      document.addEventListener('mouseup', () => {
        this.handleMouseup()
      }, !1)
    },

    handleMousemove(e) {
      if (!this.isMousedown) {
        return
      }

      console.log('move');

      let target = e.currentTarget
      let offset = 0

      while (target) {
          offset += target.offsetTop
          target = target.offsetParent
        }

      let offsetPercent = ((offset - e.pageY) / e.currentTarget.offsetHeight) * 100

      if (offsetPercent >= 0 && offsetPercent <= 80) {
        this.nowPercent = offsetPercent
        console.log(this.nowPercent);
      }
    },

    handleMouseup() {
      this.isMousedown = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../theme/index.scss';

.logger {
  position: fixed;
  left: 0;
  bottom: 30px;
  z-index: 1000;
  background: #fff;

  width: 100vw;
  height: 20%;
  
  border-top: 1px solid $border;
  overflow: auto;

  font-size: .8em;
  color: $text-color;
  @include scrollbar();

  span.msg {
    color: $danger;
  }

  li {
    padding: .5em .8em;

    &:hover {
      background: $bg;
    }
  }
  
  p {
    text-align: center;
    margin: 50px 0;
    font-size: 24px;
    color: #73879C;
  }
}

.slide-top-enter-active {
  animation: enter ease .3s;
}

.slide-top-leave-active {
  animation: leave ease .5s;
}

@keyframes enter {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes leave {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
