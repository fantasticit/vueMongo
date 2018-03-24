import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: require('@/views/layout').default,
      children: [
        {
          path: 'db/:db',
          name: 'DB',
          component: require('@/views/db/collection.vue').default,
        },
        {
          path: 'db/:db/user',
          name: 'User',
          component: require('@/views/db/user.vue').default,
        },
        {
          path: 'db/:db/collection/:collection',
          name: 'Collection',
          component: require('@/views/collection/').default,
        },
        {
          path: 'db/:db/collection/:collection/document/:document',
          name: 'Document',
          component: require('@/views/document/').default,
        },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
