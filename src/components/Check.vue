<template>
  <div id="wrap">
    <div id="container" class="sub check">
      <div class="sub_title_wrap">
        <div class="sub_title">
          분석 <span>▶</span> 거래 조회
        </div>
      </div>
      <div class="content">

        <div class="cont_title_wrap">

          <div class="cont_title">
            <div>
              <h2>Black Wallet 여부 및 AML/KYC Risk 분석</h2>
              <h3><strong>조회 Wallet</strong><span id="searchAddr">{{ searchAddr }}</span></h3>
            </div>
            <ul>
              <li>
                <!--<img src="/static/img/btn_pdf.png" class="btn" onClick=pdfDown() >-->
                <a @click=pdfDown><img src="/static/img/btn_pdf.png"> </a>
              </li>

              <li>
                <a target="_blank"  @click=googleSearch>
                  <img src="/static/img/btn_google.png"> </a>
              </li>
              <li>
                <a  @click=moveTracking> <img src="/static/img/btn_search.png"> </a>
              </li>
            </ul>
          </div>

        </div>

        <div class="content_wrap">

          <div class="check_wrap">

            <div class="score_wrap clear">

              <h2>BT-Risk Score</h2>
              <div class="percent_w2">
                <!-- <div class="percent_wrap">
                      <div class="percent circle">
                          <strong></strong>
                      </div>
                  </div> -->

                <div class="example" >
                  <div class="textProgress html">
                    <span class="tp"> <i class="fab fa-audible"></i></span>
                    <span class="tp"> <i class="fab fa-audible"></i></span>
                    <div class="progress"><span class="percent"></span></div>
                  </div>
                </div>



                <div class="score"  cellspacing="10">

                  <div class="score_box" style="text-overflow: ellipsis" v-for="item in score" >
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.data }}</p>
                    <p v-bind:class="item.color">{{ item.message }}</p>
                  </div>

                </div>
              </div>
              <div class="btn_wrap">
                <a href="#error_btn" rel="modal:open">레포트 오류</a>
                <a href="#report_btn" rel="modal:open">사기신고</a>
              </div>

            </div>

          </div>

          <ul>
            <li>
              <div class="title">
                <div class="list_wrap">
                  <h3>잔고(Balance) 조회 <span>▲</span> </h3>
                </div>
              </div>

              <div class="list_wrap" >
                <div class="text_wrap" style="padding: 0px">
                    <table class="check_list">
                      <tr v-for="item in balance">
                        <th>{{ item.title }}</th>
                        <td>{{ item.data }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </li>

                <li>
                  <div class="title">
                    <div class="list_wrap">
                      <h3>사용 여부 분석 <span>▲</span> </h3>
                    </div>
                  </div>

                  <div class="list_wrap">
                    <h5>총 거래수 <span class="deal"><a :href="`/static/sub/monitoring.html#/tx/detail?addr=${searchAddr}`"  target="_blank" >{{ deal }}</a></span></h5>
                    <div class="score_wrap">
                      <div class="score" >
                        <txGrid></txGrid>
                      </div>
                    </div>
                  </div>

                </li>
                <li>
                  <div class="title">
                    <div class="list_wrap">
                      <h3>사기 주소 <span>▲</span> </h3>
                    </div>
                  </div>

                  <div class="list_wrap">
                    <div class="score_wrap">
                      <div class="score" >
                        <blackGrid></blackGrid>
                      </div>
                    </div>
                  </div>
                </li>


                <li>
                  <div class="title">
                    <div class="list_wrap">
                      <h3>자금세탁 연관 주소 <span>▲</span> </h3>
                    </div>
                  </div>

                  <div class="list_wrap">
                    <div class="score_wrap">
                      <div class="score">
                        <amlGrid></amlGrid>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div class="title">
                    <div class="list_wrap">
                      <h3>거래소 관련 여부 분석 <span>▲</span> </h3>
                    </div>
                  </div>


                  <div class="list_wrap">
                    <h5>검색 주소에서 5단계 거래내역 추적 결과입니다.</h5>
                    <div class="score_wrap">
                      <exchangeRelGrid></exchangeRelGrid>
                    </div>
                  </div>
                </li>


                <li>
                  <div class="title">
                    <div class="list_wrap">
                      <h3>거래량 분석 <span>▲</span> </h3>
                    </div>
                  </div>

                  <div class="list_wrap">
                    <div class="score_wrap">
                      <txAccumGrid></txAccumGrid>
                    </div>
                  </div>
                </li>


                <li>

                  <div class="title">
                    <div class="list_wrap">
                      <h3>사기 여부 분석 <span>▲</span> </h3>
                    </div>
                  </div>

                  <div class="list_wrap" >
                    <div class="text_wrap" style="padding: 0px">
                      <table class="check_list2">
                        <tr v-for="item in scam">
                          <th>{{ item.title }}</th>
                          <td>{{ item.data }}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </li>
              </ul>
        </div>
      </div>

    </div>




    <!-- 모달 안의 내용물 -->
    <div id="error_btn" class="modal">

      <div class="top">
        <div class="bar"></div>
        <h1 class="logo">
          <img src="/static/img/check/modal_logo.png" alt="">
        </h1>
      </div>

      <div class="middle">

        <div class="container">
          <h2>분석 내용 오류 정정/보완 신고</h2>

          <div class="select_area">
            <span class="info">분류</span>

            <select class="wide" id="report_error">
              <option data-display="레포트 오류신고" value="report_error">레포트 오류신고</option>
              <!-- <option data-display="(선택)">Nothing</option>
               <option value="1">Some option</option>
               <option value="2">Another option</option>-->
            </select>
          </div>

          <div class="text_area">
            <span class="info">내용</span>
            <textarea name="error_message" id="error_message" cols="30" rows="10">
                    분류 선택 후, 정정/보완 요청 및 근거 내용 기술로 작성해 주세요.

                    (예시 참고)

                    [예시]
                     1) Black Wallet 주소 제외 요청
                          - 0x023d1af026393a849Bc6f9B043fa1be90E5623Ca

                     2) 요청 근거
                          - 위 주소는 개인의 주소임
                          - 요청자명/E-Mail or 확인 가능 근거 URL
                </textarea>
          </div>

        </div>

      </div>

      <div class="bottom clear">
        <div class="container">
          <a class="close_btn" rel="modal:close" >신고</a>
          <a class="cancel_btn" href="#" rel="modal:close">취소</a>
        </div>
      </div>

    </div>

    <div id="report_btn" class="modal">
      <div class="top">
        <div class="bar"></div>
        <h1 class="logo">
          <img src="/static/img/check/modal_logo.png" alt="">
        </h1>
      </div>

      <div class="middle">

        <div class="container">
          <h2>추가 사기 정보 (Wallet 등) 신고</h2>

          <div class="select_area">
            <span class="info">분류</span>

            <select class="wide">
              <option data-display="(선택)">Nothing</option>
              <option value="1">Some option</option>
              <option value="2">Another option</option>
            </select>
          </div>

          <div class="text_area">
            <span class="info">내용</span>
            <textarea name="report_message" id="report_message" cols="30" rows="10">
                    분류 선택 후, 사기 신고 요청 및 근거 내용 기술로 작성해 주세요.

                    (예시 참고)

                    [예시]
                     1) Black Wallet 주소 추가 요청
                          - 0x023d1af026393a849Bc6f9B043fa1be90E5623Ca

                     2) 요청 근거
                          - 위 주소는 ~이유로 사기 주소임
                          - 확인 가능 URL (etherscan or커뮤니티 신고 글 등)
                </textarea>
          </div>

        </div>

      </div>

      <div class="bottom clear">
        <div class="container">
          <!--<a class="close_btn" rel="modal:close" onclick=userReport('report_scam',$('#report_message').val())>신고</a>-->
          <a class="close_btn" rel="modal:close" onclick=this.userReport()>신고</a>
          <a class="cancel_btn" href="#" rel="modal:close">취소</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import txGrid from './CheckTxGrid'
import blackGrid from './CheckBlackGrid'
import amlGrid from './CheckAmlGrid'
import exchangeRelGrid from './CheckExchangeRelGrid'
import txAccumGrid from './CheckTxAccumGrid'

export default {

  name: 'check',
  components: {txGrid,blackGrid,amlGrid,exchangeRelGrid,txAccumGrid},
  props:[],
  data () {
    return {
      addr:'',
      searchAddr:'',
      score: [ { title: '잔고조회',  data: 'ETH', message:  '',  color: 'color_red', size: 'box1'  },
        { title: '사용여부분석',  data: '주소검증', message: '', color: 'color_red', size: 'box2' },
        { title: '사기여부분석',  data: '사기의심', message: '', color: 'color_red', size: 'box3' },
        { title: 'OSINT분석',  data: '검색결과', message: '있음', color: 'color_red', size: 'box4' },
        { title: '연관분석',  data: '위험요소', message: '유료사용자 제공', color: 'color_red', size: 'box5' }],
      deal: '',
      balance:'',
      scam:''
    }
  },
  watch: {
    query: {
      handler () {
        this.getScore()
      },
      deep: true
    }
  },
  methods: {
    getScore(urlData){
      const path = this.$rootPath + '/sql/get/wallet/score'
      const data = urlData
      this.$http.post(path,data)
        .then(response => {
          console.log(response)
          this.score = [
            { title: '잔고조회',  data: 'ETH', message:  response.data.round_value,  color: 'color_red', size: 'box1'  },
            { title: '사용여부분석',  data: '주소검증', message: response.data.verify, color: 'color_red', size: 'box2' },
            { title: '사기여부분석',  data: '사기의심', message: response.data.scam, color: 'color_red', size: 'box3' },
            { title: 'OSINT분석',  data: '검색결과', message: '있음', color: 'color_red', size: 'box4' },
            { title: '연관분석',  data: '위험요소', message: '유료사용자 제공', color: 'color_red', size: 'box5' }
          ]

          this.balance = [
            { title: 'Ether',  data: response.data.value  }
          ]

          this.searchAddr = response.data.addr;

          this.scam = [
            { title: '조회 결과',  data: response.data.searchResult },
            { title: '조회 내용',  data: response.data.searchContent},
            { title: '수집 근거',  data: '자체 수집' }
          ]


          const scoreGraphValue = response.data.score;
          $('.html').data("animated", false).textProgress(scoreGraphValue);
        })
        .catch(error => {
          alert('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
        })
    },
    alertSelectedUids () {
      alert(this.selection.map(({ uid }) => uid))
    },
    getUrlVars() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
      });
      return vars;
    },pdfDown() {
      $("#body-id").css("width", "1250px").css("margin", "auto");
      $("#header").css("width", "1250px");

      setTimeout(function () {
        $("#body-id").css("width", "100%");
        $("#header").css("width", "100%");
      }, 1);
      // 현재 document.body의 html을 A4 크기에 맞춰 PDF로 변환
      html2canvas(document.getElementById("wrap"), {
        onrendered: function (canvas) {

          // 캔버스를 이미지로 변환
          var imgData = canvas.toDataURL('image/jpg');

          var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
          var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;

          var doc = new jsPDF('p', 'mm');
          var position = 0;

          // 첫 페이지 출력
          doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          console.log(heightLeft)
          // 한 페이지 이상일 경우 루프 돌면서 출력
          while (heightLeft >= 20) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          // 파일 저장
          doc.save('block-tracer_dashboard.pdf');
        }
      })
    },googleSearch(){
      var goolgeParamAddr =this.searchAddr;
      let googleSearch = "https://www.google.co.kr/search?q="+goolgeParamAddr+"&oq="+goolgeParamAddr+"&aqs=chrome..69i57.494j0j9&sourceid=chrome&ie=UTF-8";
      window.open(googleSearch);
    },moveTracking(){
      location.href='/static/sub/tracking.html?addr='+this.searchAddr;
    }
  },
  mounted() {
    const urlData = this.getUrlVars();
    this.getScore(urlData)
  }
}
</script>

