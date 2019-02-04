<template>
<div id="container" class="sub tracking monit">
    <div class="sub_title_wrap">
      <div class="sub_title">
        분석 <span>▶</span> 모니터링
      </div>
    </div>
    <div class="content" id="content_monitor">
      <div class="cont_title_wrap">
        <div class="cont_title">
          <div>
            <h2>사기/주의 지갑의 지속적 모니터링 기능 제공</h2>
            <h3> 모니터링 주소 등록(1분 단위 Update) </h3>
          </div>
        </div>
        <MonitoringGrid></MonitoringGrid>
      </div>
    </div>
</div>

</template>

<script>
  import MonitoringGrid from './MonitoringGrid'

  export default {
    name: 'monitoring',
    components: {MonitoringGrid}
  }
</script>
