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

      <div class="search_bar">
        <h4>모니터링 주소 추가</h4>
        <div class="search">
          <input type="text" placeholder="Insert address to monitor" v-model="addr">
          <input type="submit" value="등록" v-on:click=addMonitor>
        </div>
      </div>
    </div>

    <div class="content_wrap monit_table">
      <table>
        <tr>
          <th>주소</th>
          <th>통화</th>
          <th>잔고</th>
          <th>거래량</th>
          <th>요청시간</th>
          <th>거래확인시간</th>
          <th>주기(초)</th>
          <th>모니터링 여부</th>
        </tr>
        <tbody v-for="item in monitor_item">
        <tr>
          <td>{{ item.addr }}</td>
          <td>{{ item.currency }}</td>
          <td>{{ item.balance }}</td>
          <td>{{ item.tx_count }}</td>
          <td>{{ item.monitor_req_time }}</td>
          <td v-if="item.last_tx_time>item.monitor_req_time" style="color:red">{{ item.last_tx_time }}</td>
          <td v-else>{{ item.last_tx_time }}</td>
          <td>{{ item.monitor_cycle_sec }}</td>
          <td v-if="item.monitor_yn=='Y'"> Yes<input type="button" value="삭제" v-on:click=delMonitor(item.addr)></td>
          <td v-else> No<input type="button" value="재요청" v-on:click=againMonitor(item.addr)></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: "monitoringTable",
    data(){
        return {
          monitor_item :[
          ],
          addr:''
        }
    },
    methods: {
      getMonitor: function () {
        const path = "/sql/get/monitor"
         this.$http.post(path)
          .then(response => {
            this.monitor_item = response.data
          })
          .catch(error => {
            if(error.response.status=='401'){
              alert("로그인 사용자만 이용가능합니다.")
            }else{
              alert("처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.")
            }
          })
      },
      addMonitor: function () {
        let path = this.$rootPath + "/sql/put/monitor";
        const data ={'addr': this.addr, 'currency_id':'eth','etc':'blockTracer' }
        this.$http.post(path,data)
          .then(response => {
            alert(response.data.message)
            if(response.data.result_code == 'success'){
              this.getMonitor()
            }
          })
          .catch(error => {
            if(error.response.status == 401){
              alert("권한이 없습니다..")
            }
            alert("처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.")
          })
      },delMonitor: function(addr){
        const path = this.$rootPath +"/sql/del/monitor"
        const data ={'addr':addr, 'currency_id':'eth' }
        this.$http.post(path,data)
          .then(response => {
            alert(response.data.message)
            this.getMonitor()
          })
          .catch(error => {
            alert("처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.")
          })
      },againMonitor: function(addr){
        const path = this.$rootPath +"/sql/update/monitor"
        const data ={'addr': addr, 'currency_id':'eth' }
        this.$http.post(path,data)
          .then(response => {
            alert(response.data.message)
            this.getMonitor()
          })
          .catch(error => {
            alert("처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.")
          })
      }
    },
    mounted : function () {
     this.getMonitor()
    }
  }
</script>
<style scoped>
</style>
