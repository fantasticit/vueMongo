<template>
  <footer>
    <ul>
      <li
        class="collapse"
        :class="{'is-active': isCollapse}"
        @click="toggleNav">
        <icon type="menu" />
      </li>
      <li
        class="console"
        :class="{'is-active': showLogger}"
        @click="() => this.showLogger = !this.showLogger">
        <icon type="console" />
      </li>
      <Logger v-if="showLogger" />
    </ul>

    <ul>
      <li 
        :class="{'is-active': showSetDialog}"
        @click="() => this.showSetDialog = true">
        <icon type="setting" />
      </li>
      <li @click="gotoHelp">
        <icon type="help" />
      </li>

      <!-- 设置弹窗 -->
      <el-dialog
        title="设置"
        :visible.sync="showSetDialog"
        width="50%"
        :before-close="() => this.showSetDialog = false">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="主题" name="theme">
            <p class="text-center">请选择一个主题</p>
            <div class="themes">
              <div @click="themeLight()" :class="{ 'is-active': !theme }">
                <img src="./light.png" alt="">
              </div>
              <div @click="themeDark()" :class="{ 'is-active': theme }">
                <img src="./dark.png" alt="">
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="字体" name="font">
            <p>
              <span>字体大小</span>
              <el-input-number v-model="fontSize" @change="handleFontSizeChange" :min="1" :max="100"></el-input-number>
            </p>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </ul>
  </footer>
</template>

<script>
import { mapState } from 'vuex';
import Bus from '@/bus';
import Logger from './logger.vue';

export default {
  name: 'Footer',

  components: {
    Logger,
  },

  computed: {
    ...mapState({
      theme: state => state.setting.theme,
    }),
  },

  data() {
    return {
      isCollapse: false,
      showLogger: false,
      showSetDialog: false,
      activeTab: 'theme',
      fontSize: window.localStorage.getItem('fontSize') || 14,
    }
  },

  methods: {
    toggleNav() {
      this.isCollapse = !this.isCollapse;
      Bus.$emit('toggleNav');
    },

    gotoHelp() {
      this.$router.push('/');
    },

    // 日间主题
    themeLight() {
      this.$store.dispatch('lightTheme');
    },

    // 夜间主题
    themeDark() {
      this.$store.dispatch('darkTheme');
    },

    handleFontSizeChange(num) {
      this.$store.dispatch('changeFontSize', num);
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../theme/index.scss';

footer {
  height: $padding * 2;
  padding: 0 $padding;
  border-top: 1px solid $border;
  color: #B3B3B3;
  font-size: 1.2em;

  @include flexLayout(space-between);
}

ul {
  @include flexLayout(space-between) {
    align-items: center;
  };

  li {
    position: relative;
    cursor: pointer;
    @include flexLayout(center) {
      align-items: center;
    };

    + li {
      margin-left: .5em;
    }

    &:hover {
      color: $primary;
      
      &::before {
        border: 1px solid $border;
        padding: .2em .8em;
      }
    }

    &::before {
      position: absolute;
      top: -1em;
      transform: translate(0%, -100%);

      font-size: .6em;
      color: $text-color;
      background: $bg;
    }
  }

  li.is-active {
    color: $primary;
  }

  li.collapse {
    &:hover {
      &::before {
        content: '收起侧边栏';
      }
    }
  }

  li.collapse.is-active {
    &:hover {
      &::before {
        content: '展开侧边栏';
      }
    }
  }
}

p {
  font-size: 1.2em;
  margin: $margin 0;
}

p.text-center {
  text-align: center;
}

.themes {
  @include flexLayout(center);

  > div {
    width: 40%;
    height: 210px;
    cursor: pointer;

    + div {
      margin-left: $margin * 5;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  >div.is-active {
    border: 2px solid $warning;
  }
}
</style>
