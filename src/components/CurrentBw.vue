<template>
  <div id="container" class="sub unusual">
    <Analysis></Analysis>
    <div  class="content_wrap">
      <div class="table_wrap">
        <h2 class="table_type" style="font-weight: bold">
          Coin별 BW 변동 <span>▶</span> 코인별 BW 등록 현황
        </h2>
      </div>
    </div>
    <CurrentBwGrid></CurrentBwGrid>
  </div>
</template>
<script>
  import Analysis from './Analysis'
  import CurrentBwGrid from './CurrentBwGrid'

  export default {
    components: {Analysis, CurrentBwGrid},
    name: 'CurrentBw'
  }
</script>

<style src="../../static/css/bootstrap.css">

</style>
