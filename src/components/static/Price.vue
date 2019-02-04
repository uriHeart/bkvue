<template>
  <div id="container" class="price">
    <div class="section sec3">
      <div class="wrap">
        <div class="section-item-box">
          <h3>가격정책(Price Policy)</h3>
          <h4>무료 조회 및 유료 분석/API 등 제공 서비스</h4>
          <ul>
            <li>
              <div class="animate" data-animate="pulse" data-duration="1.0s" data-delay="0.7s"
                   data-offset="100">
                <div class="title">
                  <h5>
                    A Level 서비스
                  </h5>
                  <h6>(무료)</h6>
                </div>
                <div class="cont">
                  <strong>기본 모니터링 서비스</strong>
                  <p>사기 주소 조회<br/>
                    BT-Risk 스코어 조회<br/>
                    사기 주소 잔고조회<br/>
                    사기 주소 추적
                  </p>
                </div>
              </div>
            </li>
            <li class="middle_item">
              <div class="animate" data-animate="pulse" data-duration="1.0s" data-delay="1.4s"
                   data-offset="100">
                <div class="title">
                  <h5>
                    B Level 서비스
                  </h5>
                  <h6>(유료)</h6>
                </div>
                <div class="cont">
                  <strong>상시 모니터링 및 추가 분석 서비스</strong>
                  <p>잔액/거래 변동 모니터링 및 Alert<br/>
                    기본 보안성 검토<br/>
                    PDF 및 AP 제공<br/>
                    분석 Report (PDF)
                  </p>
                  <div>+</div>
                  <span>기본 A Level 서비스 </span>
                </div>
              </div>
            </li>
            <li class="last">
              <div class="animate" data-animate="pulse" data-duration="1.0s" data-delay="2.1s"
                   data-offset="100">
                <div class="title">
                  <h5>
                    C Level 서비스
                  </h5>
                  <h6>(유료)</h6>
                </div>
                <div class="cont">
                  <strong>상세 분석 및 보안성 연관 분석</strong>
                  <p>이상 거래 추적 분석<br/>
                    상세 보안성 검토<br/>
                    전문가 분석 레포팅<br/>
                    PDF 및 API 제공
                  </p>
                  <div>+</div>
                  <span>기본 A Level 서비스 </span>
                  <div>+</div>
                  <span>기본 B Level 서비스 </span>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </div>
    </div>

    <div class="table_wrap">
      <table>
        <thead>
        <tr>
          <th></th>
          <th>
            A Level<br>
            <span>(무료)</span>
          </th>
          <th>
            B Level<br>
            <span>(유료)</span>
          </th>
          <th>
            C Level<br>
            <span>(유료)</span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th><span class="block">사기 주소 조회</span></th>
          <td><img src="/static/img/price/icon_check.png"></td>
          <td><img src="/static/img/price/icon_check.png"></td>
          <td><img src="/static/img/price/icon_check.png"></td>
        </tr>

        <tr>
          <th><span class="block">BT-Risk 스코어</span></th>
          <td><img src="/static/img/price/icon_check.png"></td>
          <td><img src="/static/img/price/icon_check.png"></td>
          <td><img src="/static/img/price/icon_check.png"></td>
        </tr>

        <tr>
          <th><span class="block">사기 주소 잔고 조회</span></th>
          <td><img src="/static/img/price/icon_check.png"></td>
          <td><img src="/static/img/price/icon_check.png"></td>
          <td><img src="/static/img/price/icon_check.png"></td>
        </tr>

        <tr>
          <th><span class="block">사기 주소 추적</span></th>
          <td><img src="/static/img/price/icon_check.png"></td>
          <td><img src="/static/img/price/icon_check.png"></td>
          <td><img src="/static/img/price/icon_check.png"></td>
        </tr>

        <tr>
          <th><span class="block">잔액/거래 변동 조회</span></th>
          <td></td>
          <td><img src="/static/img/price/icon_check.png"></td>
          <td><img src="/static/img/price/icon_check.png"></td>
        </tr>

        <tr>
          <th><span class="block">기본 보안성 검토</span></th>
          <td></td>
          <td><img src="/static/img/price/icon_check.png"></td>
          <td><img src="/static/img/price/icon_check.png"></td>
        </tr>

        <tr>
          <th><span class="block">이상거래 추적 분석</span></th>
          <td></td>
          <td></td>
          <td><img src="/static/img/price/icon_check.png"></td>
        </tr>

        <tr>
          <th><span class="block">상세 보안성 검토</span></th>
          <td></td>
          <td></td>
          <td><img src="/static/img/price/icon_check.png"></td>
        </tr>

        <tr>
          <th><span class="block">전문가 분석 레포팅</span></th>
          <td></td>
          <td></td>
          <td><img src="/static/img/price/icon_check.png"></td>
        </tr>

        <tr>
          <th><span class="block">PDF 및 API 제공</span></th>
          <td></td>
          <td><img src="/static/img/price/icon_check.png"></td>
          <td><img src="/static/img/price/icon_check.png"></td>
        </tr>

        </tbody>
      </table>
    </div>

    <div class="button_wrap btn_main">
      <a href="http://www.itforest.net/" target="_blank">Contact Us</a>
    </div>

  </div>
</template>

<script>
    export default {
        name: "Price"
    }
</script>

