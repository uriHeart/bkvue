<template>
  <div id="container" class="sub unusual">
    <Analysis></Analysis>
    <div  class="content_wrap">
      <div class="table_wrap">
        <h2 class="table_type">
          BW 조회 연관 분석 <span>▶</span> Top 10 조회 순위 분석
        </h2>
        <div class="table_list">
          <table class="pc">
            <colgroup>
              <col style="width: 50px;">
              <col style="width: 15%;">
              <col style="width: 15%;">
              <col style="width: 15%;">
            </colgroup>
              <tr>
                <th>No</th>
                <th>주소</th>
                <th>코인명</th>
                <th>조회수</th>
                <th>현재잔고</th>
              </tr>
            <tbody v-for="(item,index) in top10_item">
              <tr>
                <td>{{ index+1 }}</td>
                <td>{{ item.addr }}</td>
                <td>{{ item.currency }}</td>
                <td>{{ item.addr_count }}</td>
                <td align="right">{{ item.current_value }}</td>
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
    name: "Top10",
    components: {Analysis},
    data() {
      return {
        top10_item: []
      }
    },
    methods: {
      getTop10List: function(){
        const path = this.$rootPath +"/sql/get/top10"
        this.$http.post(path)
          .then(response => {
            this.top10_item = response.data
          })
          .catch(error => {
            alert("처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.")
          })
      }
    }, mounted: function () {
      this.getTop10List()
    }
  }
</script>
