<template>
  <div id="container" class="sub unusual">
    <Analysis></Analysis>
    <div  class="content_wrap">
      <div class="table_wrap">
        <h2 class="table_type">
          BW 조회 연관 분석 <span>▶</span> 다수의 이더 수집후 소수에게 보낸데이터
        </h2>
      </div>
    </div>
    <PyramidSchemeGrid></PyramidSchemeGrid>
  </div>
</template>

<script>
import Analysis from './Analysis'
import PyramidSchemeGrid from './PyramidSchemeGrid'

export default {
  name: 'PyramidScheme',
  components: {Analysis, PyramidSchemeGrid}
}
</script>
