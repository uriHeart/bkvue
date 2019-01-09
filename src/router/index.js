import Vue from 'vue'
import Router from 'vue-router'
import MonitoringTable from '@/components/MonitoringTable'
import Top10 from '@/components/Top10'
import CurrentBW from '@/components/CurrentBW'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MonitoringTable',
      component: MonitoringTable
    },
    {
      path: '/top10',
      name: 'Top10',
      component: Top10
    },
    {
      path: '/current/bw',
      name: 'CurrentBW',
      component: CurrentBW
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
