<template>
  <el-menu>
    <el-submenu
      :index="data.name">
      <template slot="title">
        <icon type="database" />
        <span slot="title">{{ data.name }}</span>
      </template>
      <el-menu-item v-for="(item, i) in data.children" :key="i" :index="data.name + '-' + i" @click="setCollection(item)">
        <icon type="page" />
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
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

  data() {
    return {
      visible: false
    }
  },

  methods: {
    toggle() {
      this.visible = !this.visible
    },

    setCollection(collection) {
      if (!collection.parent) {
        return
      }

      this.$router.replace(`/db/${collection.parent}/collection/${collection.name}`)
    }
  },
}
</script>

<style lang="scss" scoped>
ul.el-menu /deep/ {
  background: inherit;
  border: 0;

  .el-submenu__title {
    color: #fff;

    &:hover {
      background: #001528;
    }
  }

  ul.el-menu--inline {
    background: #1f2d3d;
    color: #fff;
  }

  .el-menu-item {
    color: inherit;
  }

  .el-menu-item:focus,
  .el-menu-item:hover {
    background: #001528;
    color: #fff;
  }

  .el-menu-item.is-active {
    color: rgb(64, 158, 255);
  }
}

li {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
