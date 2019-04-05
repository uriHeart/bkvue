<template>
  <div id="container" class="sub unusual">

    <Analysis></Analysis>
    <div  class="content_wrap">
      <div class="table_wrap">
        <h2 class="table_type">
          BW 조회 연관 분석 <span>▶</span> 비정상 Ether 수신내역
        </h2>
      </div>
    </div>
    <AmountDoubleGrid></AmountDoubleGrid>
  </div>
</template>

<script>
import Analysis from './Analysis'
import AmountDoubleGrid from './AmountDoubleGrid'

export default {
  name: 'AmountDouble',
  components: {Analysis, AmountDoubleGrid}
}
</script>
