import Vue from 'vue'
import Router from 'vue-router'
import Monitoring from '@/components/Monitoring'
import Top10 from '@/components/Top10'
import CurrentBw from '@/components/CurrentBw'
import BlackIp from '@/components/BlackIp'
import BlackUrl from '@/components/BlackUrl'
import Test from '@/components/Test'
import Price from '@/components/static/Price'
import Solution from '@/components/static/Solution'
import Intelligence from '@/components/static/Intelligence'
import Overview from '@/components/static/Overview'
import Usecases from '@/components/static/Usecases'
import Check from '@/components/Check'
import TxDetail from '@/components/TxDetail'
import ExchangeRel from '@/components/ExchangeRel'
import AmountDouble from '@/components/AmountDouble'
import PyramidScheme from '@/components/PyramidScheme'
import TxSearch from '@/components/TxSearch'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/check',
      name: 'Check',
      component: Check
    },{
      path: '/',
      name: 'Monitoring',
      component: Monitoring
    },
    {
      path: '/top10',
      name: 'Top10',
      component: Top10
    },
    {
      path: '/current/bw',
      name: 'CurrentBw',
      component: CurrentBw
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },{
      path: '/intelligence',
      name: 'Intelligence',
      component: Intelligence
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview
    },
    {
      path: '/usecases',
      name: 'Usecases',
      component: Usecases
    },
    {
      path: '/solution',
      name: 'Solution',
      component: Solution
    },
    {
      path: '/price',
      name: 'Price',
      component: Price
    },
    {
      path: '/black/ip',
      name: 'BlackIp',
      component: BlackIp
    },
    {
      path: '/black/url',
      name: 'BlackUrl',
      component: BlackUrl
    },
    {
      path: '/tx/detail',
      name: 'TxDetail',
      component: TxDetail
    },
    {
      path: '/exchange/rel',
      name: 'exchangeRel',
      component: ExchangeRel
    },
    {
      path: '/amount/double',
      name: 'amountDouble',
      component: AmountDouble
    },
    {
      path: '/pyramid/scheme',
      name: 'pyramidScheme',
      component: PyramidScheme
    },
    {
      path: '/tx/search',
      name: 'txSearch',
      component: TxSearch
    }
  ]
})
