import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
      children: [{
        path: 'db/:db/collection/:collection',
        name: 'collection',
        component: require('@/components/collection').default,
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
