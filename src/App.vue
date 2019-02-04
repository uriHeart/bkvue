<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import Datatable from 'vue2-datatable-component'
import Vue from 'vue'
import Opt from './components/comps/td-Opt'
import DisplayRow from './components/comps/nested-DisplayRow'
import Color from './components/comps/td-Color'
import CreatetimeTd from './components/comps/td-Createtime'
import CreatetimeTh from './components/comps/th-Createtime'
import Email from './components/comps/td-Email'
import IP from './components/comps/td-IP'
import FilterTh from './components/comps/th-Filter'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)

window.Vue = Vue
Vue.use(Datatable)

Vue.component('Opt',Opt)
Vue.component('DisplayRow',DisplayRow)
Vue.component('Color',Color)
Vue.component('CreatetimeTd',CreatetimeTd)
Vue.component('CreatetimeTh',CreatetimeTh)
Vue.component('Email',Email)
Vue.component('IP',IP)
Vue.component('FilterTh',FilterTh)

export default {
  name: 'App'
}
</script>


<style>
</style>
