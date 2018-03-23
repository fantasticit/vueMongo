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
          path: 'db/:db',
          name: 'DB',
          component: require('@/components/db/collection.vue').default,
        },
        {
          path: 'db/:db/user',
          name: 'User',
          component: require('@/components/db/user.vue').default,
        },
        {
          path: 'db/:db/collection/:collection',
          name: 'Collection',
          component: require('@/components/collection/').default,
        },
        {
          path: 'db/:db/collection/:collection/document/:document',
          name: 'Document',
          component: require('@/components/document/').default,
        },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
