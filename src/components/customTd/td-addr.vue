<template>
  <a :href="`/static/sub/monitoring.html#check?addr=${value}`"  target="_blank">{{ value }}</a>
</template>
<script>
export default {
  props: ['value']
}
</script>
