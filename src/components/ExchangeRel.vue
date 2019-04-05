<template>
  <div id="container" class="sub unusual">
    <Analysis></Analysis>
    <div  class="content_wrap">
      <div class="table_wrap">
        <h2 class="table_type">
          BW 조회 연관 분석 <span>▶</span> 거래소 연관없는 사기주소
        </h2>
      </div>
    </div>
    <ExchangeRelGrid></ExchangeRelGrid>
  </div>
</template>

<script>
import Analysis from './Analysis'
import ExchangeRelGrid from './ExchangeRelGrid'

export default {
  name: 'ExchangeRel',
  components: {Analysis, ExchangeRelGrid}
}
</script>
