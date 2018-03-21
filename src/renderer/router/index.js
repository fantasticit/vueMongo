import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: require('@/components/layout').default,
      children: [
        {
          path: 'db/:db/collection/:collection',
          name: 'Collection',
          component: require('@/components/collection/').default,
        },
        {
          path: 'db/:db/collection/:collection/document/:document',
          name: 'Document',
          component: require('@/components/document/index.vue').default,
        },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
