<template>
  <ul>
    <p @click="toggle">{{ data.name }}</p>
    <el-collapse-transition>
      <div v-show="visible">
        <li v-for="(item, i) in data.children" :key="i" @click="setCollection(item)">
          {{ item.name }}
        </li>
      </div>
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
// p, li {
//   width: 100%;
//   padding: 1rem;
//   background: red;
// }

ul {
  padding: 0;
  cursor: pointer;
}

p, li {
  padding: 10px 15px;
}

li {
  padding-left: 25px;
}
</style>
