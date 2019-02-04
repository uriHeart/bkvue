<template>
  <!--<a :href="`/#/check?addr=${row.origin_from}`">{{ value }}</a>-->
    <div v-if="row.origin_from===row.addr" class ="td-reduction">{{ value }} </div>
    <a v-else :href="`/static/sub/monitoring.html#/check?addr=${row.origin_from}`"  target="_blank" class ="td-reduction">{{ value }}</a>
</template>
<script>
export default {
  props: ['value','row']
}
</script>
<style scoped>
.td-reduction {
  display:inline-block;
  vertical-align: bottom;
  text-overflow: ellipsis;
  overflow: hidden;
  width:150px;
}
</style>
