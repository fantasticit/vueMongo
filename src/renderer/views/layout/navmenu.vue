<template>
  <ul class="menu">
    <li class="menu-item" @click.stop="toggle">
      <icon type="database" class="icon" />
      <span slot="title" @click.stop="gotoDB(data.name)">{{ data.name }}</span>
      <icon type="arrow" class="arrow" :class="{ 'is-active': visible }" />
    </li>
    <el-collapse-transition>
      <ul class="submenu" v-show="visible">
        <li
        class="submenu-item"
        v-for="(item, i) in data.children" :key="i"
        :class="{ 
          'is-active': $route.params.db &&
                       $route.params.db === data.name && 
                       $route.params.collection &&
                       $route.params.collection === item.name 
        }"
        @click="gotoCollection(item)">
          <icon type="table" class="icon" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </el-collapse-transition>
  </ul>
</template>

<script>
export default {
  name: 'TreeList',

  props: {
    data: {
      type: Object,
      default: () => []
    }
  },

  watch: {
    '$route'() { // 自动展开功能
      if (
        this.$route.params['collection']
        && this.$route.params['db'] === this.data.name
      ) {
        this.$nextTick(_ => this.visible = true);
      } else if (!this.$route.params['collection']) {
        this.visible = false
      }
    }
  },

  data() {
    return {
      visible: false
    }
  },

  methods: {
    toggle() {
      this.visible = !this.visible
    },

    gotoDB(db) {
      this.$router.push(`/db/${db}/`)
    },

    gotoCollection(collection) {
      this.$router.push(`/db/${collection.parent}/collection/${collection.name}`)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../theme/index.scss';

ul.menu {
  border: 1px solid $border;
  border-left: 0;
  border-right: 0;
  background: #fff;

  + ul.menu {
    border-top: 0;
  }

  li {
    &:hover {
      // background: #001528;
    }
  }
}

li {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
  list-style: none;
  cursor: pointer;
  position: relative;
  transition: border-color .3s,background-color .3s,color .3s;

  display: flex;
  align-items: center;

  span {
    margin-left: 22px;
  }
}

li.menu-item {
  height: 56px;
  line-height: 56px;
  padding: 0 20px;

  span {
    position: relative;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

li.submenu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 40px;
  // background: #1f2d3d;
}

li.is-active {
  color: $menu-active-color;
  background: $menu-active-bg;
}

.icon {
  position: absolute;
}

.arrow {
  position: absolute;
  right: 20px;
  transition: all ease .3s;
}

.arrow.is-active {
  transform: rotate(180deg);
}
</style>
