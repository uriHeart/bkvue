<template>
  <div>
   <div v-if="row.monitor_req_time < row.last_tx_time" style="color:red">{{value}}</div>
   <div v-else >{{value}}</div>
  </div>
</template>
<script>
export default {
  props: ['row','value']
}
</script>
