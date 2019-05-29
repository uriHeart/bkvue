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
    <ExchangeNotRelGrid></ExchangeNotRelGrid>
  </div>
</template>

<script>
import Analysis from './Analysis'
import ExchangeNotRelGrid from './ExchangeNotRelGrid'

export default {
  name: 'ExchangeNotRel',
  components: {Analysis, ExchangeNotRelGrid}
}
</script>
