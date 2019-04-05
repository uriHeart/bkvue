<template>
  <div  class="content" style="text-align: center">
    <div style="height:100px"></div>
      <div class="search_bar">
        <h4>기준일</h4>
             <input type="text" id="datepicker1" class="form-control" style="width:20%" >
            <div class="search">
              <h4>기준 Ether</h4>
              <input id = "addr" type="text" placeholder="ether value"  class="form-control" style="width:20%" v-model="etherValue">
              <input type="submit"  value="Search" v-on:click=getData style="height: 40px;border: none">
            </div>
      </div>
    <div id="tx-detail-table">
      <datatable v-bind="$data">
        <!--<button class="btn btn-default" @click="alertSelectedUids" :disabled="!selection.length">-->
        <!--<i class="fa fa-commenting-o"></i>-->
        <!--Alert selected uid(s)-->
        <!--</button>-->
      </datatable>
    </div>
  </div>

</template>
<script>
  $.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
  });
  $(function() {
     $("#datepicker1").datepicker();
  });

  import fromAddr from './customTd/td-origin-from-addr'
  import toAddr from './customTd/td-origin-to-addr'
  import hash from './customTd/txDetail-td-hash'
  import nestedDisplay from './customTd/tx-detail-nested-DisplayRow'
  import opt from './customTd/tx-detail-td-Opt'

  export default {
    name: 'FriendsTable', // `name` is required as a recursive component
    components: {fromAddr,toAddr,hash,nestedDisplay,opt},
    props: [], // from the parent FriendsTable (if exists)
    data () {
      const amINestedComp = !!this.row
      return {
        supportBackup: false,
        supportNested: true,
        tblClass: 'table-bordered',
        pagination:true,
        pageSizeOptions: [20,50,100,200],
        columns: (() => {
          const cols = [
             { title: 'Hash', field: 'hash', tdComp:'hash', tdStyle:'display:inline-block; text-overflow: ellipsis; overflow: hidden; width:150px;',thStyle:'width:150px'},
            { title: 'Block', field: 'blockNumber'},
            { title: '거래시간', field: 'timestampSeoul',  sortable: true, tdStyle:'width:200px'},
            { title: 'From', field: 'from',thComp: 'FilterTh'  ,tdComp:'fromAddr',sortable: true},
            { title: 'To', field: 'to',thComp: 'FilterTh'  ,tdComp:'toAddr',sortable: true },
            { title: '거래금액(Ether)', field: 'floatValue',sortable: true,tdStyle: 'text-align:right'},
             { title: 'Original From', field: 'origin_from', visible: false},
            { title: 'Original To', field: 'origin_to', visible: false },
            { title: 'addr', field: 'addr', visible: false },
            { title: 'tokenName', field: 'tokenName', visible: false },

          ]
          const groupsDef = {
            Normal: ['tx_time', 'currency', 'from', 'to'],
            Sortable: ['tx_amount', 'currency']
          }
          return cols.map(col => {
            Object.keys(groupsDef).forEach(groupName => {
              if(groupsDef[groupName].includes(col.title)) {
                col.group = groupName
              }
            })
            return col
          })
        })(),
        data: [],
        loading: true,
        origin_data: [],
        total: 0,
        addr:'',
        etherValue:'',
        searchDate:'',
        summary: {},
        query: amINestedComp ? { uid: this.row.friends } : { limit: 20, offset: 0, sort: '', order: '' },
        xprops: {
          eventbus: new Vue()
        }
      }
    },
    watch: {
      query: {
        handler () {

            this.handleDataChange()
        },
        deep: true
      }
    },
    methods: {
      handleDataChange () {
        this.getData()
      },
      getData(){
        this.data=[];
        this.loading = true;
        const path = this.$rootPath + '/es/tx/list'
        let sort = this.query.sort =='' ? 'blockNumber' : this.query.sort
        let order = this.query.order =='' ? 'desc' : this.query.order
        let searchDate = $('#datepicker1').val()+' 00:00:00'
        const data = {size:this.query.limit, sort:sort, page:this.query.offset, order:order, searchDate:searchDate, etherValue: this.etherValue}

        this.$http.post(path,data)
          .then(response => {
            this.data = response.data.data_list
            this.total = response.data.total
            if(response.data.total==0){
              this.loading = false;
            }
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          })
      },

      getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
          vars[key] = value;
        });
        return vars;
      },
      alertSelectedUids () {

        this.data.map( row=>{
          //console.log(row)
          //row.currency ='ETH'

          if(row.hash == this.selection.map(({ hash }) => hash)){
                 row.currency ='ETH'
                 //this.selection =['0x113db5757722df00feeed30ae3140cfabf39a7102ac4f57ecaf63e38429e4d54']
              }
          }
        )
      }
    },
    mounted(){

      var today = new Date();
      var monthOfYear = today.getMonth()
      today.setMonth(monthOfYear - 3)
      var month = today.getMonth() + 1; //months from 1-12
      var day = today.getDate();
      var year = today.getFullYear();

      if ((day+"").length < 2) {       // 일이 한자리 수인 경우 앞에 0을 붙여주기 위해
        day = "0" + day;
      }

      if ((month+"").length < 2) {       // 월이 한자리 수인 경우 앞에 0을 붙여주기 위해
        month = "0" + month;
      }

      today = year + "-" + month + "-" + day;
      document.getElementById("datepicker1").value = today
      this.etherValue = 10000

      this.getData()

    }
  }
</script>
<style scoped>
  .search_bar div input[type="submit"] {background: #fcba1e; color:#fff; font-weight: bold; font-size: 17px; width: 80px;    }
  .search_bar h4{font-size: 20px; text-align: left; float: left; padding: 9px 0; width: 10%  }
  .search_bar {width: 100%; display: inline-block; margin-top: 80px; max-width: 1200px;   }
  .search_bar input { float: left;  }
  .search_bar > input { background: #fff; height: 40px; padding: 10px; box-sizing: border-box; font-size: 16px; border: 1px solid #ccc; margin-right: 10px;  }
  .search_bar  div input[type="text"]{ float: left; border: none; width: calc(100% - 350px); background: #fff; height: 40px;  padding: 10px;
    box-sizing: border-box; font-size: 16px; border: 1px solid #ccc;   }
  .tracking .search_bar  div input[type="submit"]{ float: left; background:#fcba1e url("/static/img/search_btn.png") center center no-repeat; width: 40px; height: 40px;
    border: none; cursor: pointer; }

  #tx-detail-table {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin: 0px auto 0;
    width: 1200px;
    border-spacing: 0;
    border-collapse: collapse;
  }

  tfoot > tr > td {
    border: 0px solid #ddd;
  }

  .list_wrap {
    margin: auto;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 100px;
    font-size: 15px;
  }
  .text_wrap table {
    margin: auto;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 10px;
    font-size: 15px;
  }
  .text_wrap table th {
    width: 100px;
    border-right: solid 1px #cccccc;
    padding: 7px 17px;
    border-top: solid 1px #cccccc;
    border-bottom: solid 1px #cccccc;
    line-height: 1.5;
  }
  .text_wrap table td {
    padding: 7px 17px;
    border-top: solid 1px #cccccc;
    border-bottom: solid 1px #cccccc;
    line-height: 1.5;
    padding-left: 30px;
  }
</style>

