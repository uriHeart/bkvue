<template>
  <div>
    <div class="sub_title_wrap">
      <div class="sub_title">
        분석 <span>▶</span> 이상거래분석
      </div>
    </div>
    <div class="content">

      <div class="cont_title_wrap">

        <div class="cont_title">
          <div>
            <h2>
              Black Wallet(BW) 거래 패턴 및<br>
              보안성 연관 정보 분석 기반 이상거래 추적 분석
            </h2>
          </div>
        </div>
      </div>
      <div class="content_wrap">
      <nav>
        <ul>
          <li>
            <span>BW 조회 연관 분석</span>
            <div class="sub_nav_wrap">
              <ul class="sub_nav">
                <li><a href="monitoring.html#/top10">Top 10 조회 순위 분석</a></li>
                <li><a href="unusual_2.html">Top 10 연관 조회 분석</a></li>
              </ul>
              <div class="bg"></div>
            </div>
          </li>
          <li>
            <span>Coin별 BW 변동</span>
            <div class="sub_nav_wrap">
              <ul class="sub_nav">
                <li><a href="monitoring.html#/current/bw">코인별 BW 등록 현황</a></li>
              </ul>
            </div>
          </li>
          <li>
            <span>BW Balance(잔고) 변동</span>
            <div class="sub_nav_wrap">
              <ul class="sub_nav">
                <li><a href="unusual_4.html">Top 10 BW 잔고 변동</a></li>
                <li><a href="unusual_5.html">코인별 BW 잔고 변동</a></li>
              </ul>
            </div>
          </li>
          <li>
            <span>상세 분석 및 이상거래 추적</span>
            <div class="sub_nav_wrap">
              <ul class="sub_nav">
                <li><a href="unusual_6.html">1) BW vs. 거래소 거래 분석</a></li>
                <li><a href="unusual_6.html">2) BW 역추적 거래 분석</a></li>
                <li><a href="unusual_6.html">3) BW 유효성 증감 분석</a></li>
                <li><a href="unusual_6.html">4) BW vs. Black IP 연관 분석</a></li>
                <li><a href="unusual_6.html">5) BW vs. 접속 IP 연관 분석</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Analysis"
  }
</script>
<style scoped>
</style>
