<template>
  <div id="container" class="sub unusual">
    <Analysis></Analysis>
    <div  class="content_wrap">
      <div class="table_wrap">
        <h2 class="table_type">
          BW 조회 연관 분석 <span>▶</span> Top 10 조회 순위 분석
        </h2>
      </div>
    </div>
    <top10-grid></top10-grid>
  </div>
</template>

<script>
import Analysis from './Analysis'
import Top10Grid from './Top10Grid'

export default {
  name: 'Top10',
  components: {Analysis,Top10Grid}
}
</script>

