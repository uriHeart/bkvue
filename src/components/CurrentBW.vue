<template>
  <div id="container" class="sub unusual">
    <Analysis></Analysis>
    <div  class="content_wrap">
      <div class="table_wrap">
        <h2 class="table_type">
          Coin별 BW 변동 <span>▶</span> 코인별 BW 등록 현황
        </h2>
        <div class="table_list">
          <table class="pc">
            <tr>
              <th rowspan="2">
                No
              </th>
              <th colspan="2">
                BW 코인종류
              </th>
              <th rowspan="2">
                BW 등록수
              </th>
              <th rowspan="2">
                Update 날짜
              </th>
              </tr>
              <tr>
                <th>
                  Coin
                </th>
                <th>
                  이름
                </th>
              </tr>
            <tbody v-for="(item,index) in bw_sum_list">
              <tr>
                <td>{{ index+1 }}</td>
                <td>{{ item.currency_id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.total }}</td>
                <td>{{ item.update_date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Analysis from "./Analysis";
  export default {
    name: "current-bw",
    components: {Analysis},
    data() {
      return {
        bw_sum_list: []
      }
    },
    methods: {
      getCurrentBWList: function(){
        const path = this.$rootPath +"/sql/get/black/sum/avail"
        this.$http.post(path)
          .then(response => {
            this.bw_sum_list = response.data
          })
          .catch(error => {
            alert("처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.")
          })
      }
    }, mounted: function () {
      this.getCurrentBWList()
    }
  }
</script>
