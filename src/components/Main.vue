<template>

  <div id="container" class="main">
    <div class="section sec1">
      <div class="wrap">
        <div class="section-item-box">
          <div class=" fl left">
            <h2>Black Wallet Transactions & Monitoring</h2>
            <h3>사기 주소 추적 및 모니터링, 자금 세탁 방지(AML)</h3>

            <div class="down" id="mainInit">
              <div class="search">
                <input id="addr" type="text" placeholder="Wallet Address, IP, Email Address">
                <input type="submit" v-on:click="addrScore" value="">
              </div>
              <ul>
                <li><strong>Black Wallet DB</strong>
                  <div class="iCountUp">
                    <ICountUp
                      :endVal="endVal"
                      :options="options"
                      @ready="onReady"
                    />
                  </div>
                  <!--<span class="num_up" >{{total}}</span>-->
                </li>
                <li><strong>다수 조회 Wallet</strong>
                  <ul>
                    <li v-for="top in topList">
                      <span id="checkAddr" v-on:click="moveCheck" style="cursor:pointer;color:#73879C">{{top.addr}}</span>
                    </li>
                  </ul>
                </li>

                <li><strong>black url 목록</strong>

                  <span id="dest1"></span>

                </li>

                <!-- <li><strong>최근 등록된 Black E-Mail</strong> <span>0xdf919@gmail.com</span></li> -->
              </ul>

            </div>

          </div>
          <div class=" fr right">
            <img src="/static/img/main_gif.gif">
          </div>
        </div>
        <div class="bottom_next">
          <img src="/static/img/bottom_next.png">
        </div>
      </div>
    </div>
    <div class="section sec2">
      <div class="wrap">
        <div class="section-item-box">
          <h2>Blockchain 및 Black-Wallet Transactions</h2>
          <h3>분석을 위한 맞춤형 솔루션 제공</h3>
          <ul>
            <li>
              <div class="animate" data-animate="pulse" data-duration="1.0s" data-delay="0.7s"
                   data-offset="100">
                <img src="/static/img/wsolution_icon1.png">
                <p>On-Demand<br/>
                  전문가 분석</p>
              </div>
            </li>
            <li>
              <div class="animate" data-animate="pulse" data-duration="1.0s" data-delay="1.4s"
                   data-offset="100">
                <img src="/static/img/wsolution_icon2.png">
                <p>컴플라이언스<br/>
                  이슈 대응</p>
              </div>
            </li>

            <li>
              <div class="animate" data-animate="pulse" data-duration="1.0s" data-delay="2.1s"
                   data-offset="100">
                <img src="/static/img/wsolution_icon3.png">
                <p>인텔리전스<br/>
                  화면 및 기능</p>
              </div>
            </li>
            <li>
              <div class="animate" data-animate="pulse" data-duration="1.0s" data-delay="2.8s"
                   data-offset="100">
                <img src="/static/img/wsolution_icon4.png">
                <p>포렌직 및<br/>
                  침해사고 대응</p>
              </div>
            </li>
            <li>
              <div class="animate" data-animate="pulse" data-duration="1.0s" data-delay="3.5s"
                   data-offset="100">
                <img src="/static/img/wsolution_icon5.png">
                <p>Wallet 및 Coin<br/>
                  취약점 분석</p>
              </div>
            </li>
          </ul>

          <div class="btn_main">
            <a href="/#/solution">Contact Us</a>
          </div>

        </div>
      </div>
    </div>
    <div class="section sec3">
      <div class="wrap">
        <div class="section-item-box">
          <h3>가격정책 (Price Policy)</h3>
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
                  <p>사기 주소 조회 및 추적<br/>
                    잔고 조회
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
                  <p>사기 주소 잔액 모니터링 및 Alert<br/>
                    PDF 제공 및 API 제공
                  </p>
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
                  <p>상세 보안성 연관 분석, 이상거래 분석 등<br/>
                    PDF제공 및 API 제공
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div class="btn_main">
            <a href="#/price">More Info</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import ICountUp from 'vue-countup-v2';
  export default {
    components: {
      ICountUp
    },
    name: 'Main',
    data() {
      return{
        total :'',
        endVal: 0,
        topList:'',
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
      }
    },
    methods: {

      onReady: function(instance, CountUp) {
        const that = this;
        instance.update(that.endVal + 100);
      },
      moveCheck : function(addr){
        location.href='/#/check?addr='+addr.toElement.innerText
      },
      addrScore : function(){

        var email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        var expUrl =  /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

        var expIp = /^(([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)\.){3}([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)$/
        var ether = /0x[a-fA-F0-9]{40}/;

        var inputValue = $("#addr").val();
        //console.log($("#addr").val().match(email)+"email")
        //console.log(email.test($("#addr").val()))
        //console.log(expIp.test($("#addr").val()))
        //console.log(expUrl.test($("#addr").val()))
        //console.log(ether.test($("#addr").val()))

        if(email.test(inputValue) || expIp.test(inputValue) || expUrl.test(inputValue)){
          const options = {title: 'Info', size: 'sm'}
          this.$dialogs.alert(" Black(사기 등) URL, IP 및 E-Mail 조회 서비스는 유료사용자에 한해서 제공됨", options)
          //TO_DO  추후 다른 코인도 가능하도록 변경
        }else if(ether.test(inputValue)){
          this.addSearchAddr(inputValue)
          location.href='/#/check?addr='+inputValue
        }else{
          const options = {title: 'Info', size: 'sm'}
          this.$dialogs.alert("입력 형식이 올바르지 않습니다.", options)
        }
      },
      addSearchAddr :function (addr) {
        const path = this.$rootPath + '/sql/put/top10'
        const data = {'addr':addr.toLowerCase()}
        this.$http.post(path,data)
          .then(response => {

          }).catch({

        })
      }
    },
    mounted() {
      const path = this.$rootPath + '/sql/main/init/data'
      this.$http.post(path,'')
        .then(response => {
          console.log(response)
          this.endVal = response.data.totalCount
          this.topList = response.data.topList

          let  from = response.data.urlList

          $J("#dest1").fadeOut(1000,function(){$(this).text(from[9].url)}).fadeIn(1000);
          let total = from.length;

          let i = 0;

          setInterval(function(){

            $J("#dest1").fadeOut(2000,function(){$(this).text(from[i].url)}).fadeIn(2000);

            if (i >= total-1) i = 0;

            else i++;

          },1000);

        }).catch({

      })
     }
  }

  // function addSearchAddr(addr){
  //   $.ajax({
  //     url: "/sql/put/top10",
  //     type: 'POST',
  //     dataType:'json',
  //     data: JSON.stringify({
  //       'addr': addr.toLowerCase(),
  //     }),
  //     contentType: "application/json",
  //     cache: false,
  //     success: function(responseJson) {
  //
  //     }
  //   });
  // }


</script>

<style>
  .v-dialog{font-weight:100;align-items:center;bottom:0;display:none;-ms-flex-align:center;-ms-flex-pack:center;justify-content:center;left:0;opacity:0;overflow:hidden;padding:8px;position:fixed;right:0;top:0}.v-dialog.v-dialog-sm .v-dialog-container{max-width:320px;padding:0 8px}.v-dialog.v-dialog-lg .v-dialog-container{box-shadow:none;max-width:960px}.v-dialog.active,.v-dialog:target{display:flex;display:-ms-flexbox;opacity:1;z-index:400}.v-dialog.active .v-dialog-overlay,.v-dialog:target .v-dialog-overlay{background:rgba(248,249,250,.75);bottom:0;cursor:default;display:block;left:0;position:absolute;right:0;top:0}.v-dialog.active .v-dialog-container,.v-dialog:target .v-dialog-container{animation:slide-down .2s ease 1;z-index:1}.v-dialog-container{background:#fff;border-radius:2px;box-shadow:0 4px 10px rgba(69,77,93,.3);display:flex;display:-ms-flexbox;-ms-flex-direction:column;flex-direction:column;max-height:75vh;max-width:640px;padding:0 16px;width:100%;color:#50596c}.v-dialog-container.v-dialog-fullheight{max-height:100vh}.v-dialog-container .v-dialog-header{color:#454d5d;padding:16px}.v-dialog-container .v-dialog-header .v-dialog-title{font-size:110%;font-weight:400}.v-dialog-container .v-dialog-body{overflow-y:auto;padding:16px;position:relative}.v-dialog-container .v-dialog-body .v-dialog-input{display:block;width:100%}.v-dialog-container .v-dialog-body .prompt-error-message{color:#d9534f;font-size:14px}.v-dialog-container .v-dialog-footer{padding:16px;text-align:right}.v-dialog-container .v-dialog-btn{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;border:none;color:#5cb85c;cursor:pointer;display:inline-block;font-size:16px;height:36px;line-height:20px;outline:none;padding:7px 8px;text-align:center;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}.v-dialog-container .v-dialog-btn.v-dialog-btn-danger{color:#d9534f}.v-dialog-container .v-dialog-btn.v-dialog-btn-close{height:16px;line-height:16px;margin-left:8px;margin-right:-15px;padding:0;width:16px;float:right;color:#50596c}.v-dialog-container .v-dialog-btn.v-dialog-btn-close:before{content:"\2715"}.v-dialog-container .v-dialog-btn.disabled,.v-dialog-container .v-dialog-btn:disabled,.v-dialog-container .v-dialog-btn[disabled]{cursor:default;opacity:.5;pointer-events:none}
</style>
