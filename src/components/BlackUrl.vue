<template>
  <div id="container" class="sub unusual">
    <Analysis></Analysis>
    <div  class="content_wrap">
      <div class="table_wrap">
        <h2 class="table_type">
          BW 조회 연관 분석 <span>▶</span> Black 스캠 사이트 조회
        </h2>
      </div>
    </div>
    <BlackUrlGrid></BlackUrlGrid>
  </div>
</template>

<script>
import Analysis from './Analysis'
import BlackUrlGrid from './BlackUrlGrid'

export default {
  name: 'BlackIP',
  components: {Analysis,BlackUrlGrid}
}
</script>

