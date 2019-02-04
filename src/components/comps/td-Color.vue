<template>
  <div class="-td-color-comp" :style="{ 'background-color': value }" v-on:click="alert">
    {{ value }}
  </div>
</template>
<script>
export default {
  props: ['value'],
  methods: {
    alert: function (event) {
      // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
      // console.log(event.path[1].style)
      console.log(this)
       event.path[1].style='padding:0px'
      // `event` 는 네이티브 DOM 이벤트입니다
      if (event) {
        //alert(event.target)
      }
    }
  }
}
</script>
<style>
.-td-color-comp {
  width: 100%;
  height: 100%;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  line-height: 90px;
  border : 0px;
}
</style>
