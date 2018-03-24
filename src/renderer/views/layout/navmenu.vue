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
    // '$route'() { // 自动展开功能
    //   if (
    //     this.$route.params['collection']
    //     && this.$route.params['db'] === this.data.name
    //   ) {
    //     this.$nextTick(_ => this.visible = true);
    //   } else if (!this.$route.params['collection']) {
    //     this.visible = false
    //   }
    // }
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
}

li {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1em;
  list-style: none;
  cursor: pointer;
  position: relative;
  transition: all .3s ease;

  display: flex;
  align-items: center;

  &:hover {
    background: $menu-active-bg;
  }

  span {
    margin-left: 22px;
  }
}

li.menu-item {
  padding: 1em 20px;

  span {
    position: relative;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

li.submenu-item {
  font-size: .9em;
  padding: .9em 40px;
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
