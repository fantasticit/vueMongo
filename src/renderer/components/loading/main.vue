<template>
  <transition name="slide-bottom">
    <div class="loading" v-if="visible">
      <p>
        <icon type="loading" />
        <span>正在加载中</span>
      </p>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../theme/index.scss';

.loading {
  position: fixed;

  width: 320px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid $border;
  position: fixed;
  left: 50%;
  top: 70px;
  margin-left: -160px;

  background-color: #edf2fc;
  overflow: hidden;
  padding: .6em .6em .6em 1em;
  display: flex;
  align-items: center;

  font-size: .8em;
  color: $success;

  p {
    width: 100%;
    text-align: center;
    @include flexLayout(center) {
      align-items: center;
    };

    svg {
      margin-top: 1px;
      margin-right: .5em;
      animation: loading infinite .5s linear;
      animation-fill-mode: forwards;

      @keyframes loading {
        from {
          transform: rotate(0);
        }

        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}

.slide-bottom-enter-active {
  animation: enter ease .3s;
}

.slide-bottom-leave-active {
  animation: leave ease .5s;
}

@keyframes enter {
  from {
    opacity: 0;
    transform: translateY(-70px);
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
    transform: translateY(-70px);
  }
}
</style>
