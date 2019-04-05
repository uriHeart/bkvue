<template>
  <div >
    <div class="search_bar">
      <h4>모니터링 주소 추가</h4>
      <div class="search">
        <input type="text" placeholder="Insert address to monitor" v-model="addr">
        <input type="submit" value="등록" v-on:click=addMonitor>
      </div>
    </div>
    <div id="monitoring-data-table">
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
  import dataHandler from './_dataHandler'
  import tdAddr from './customTd/td-addr'
  import tdYn from './customTd/monitorGrid-td-Yn'
  import tdColor from './customTd/monitorGrid-td-color'

  export default {
    name: 'FriendsTable', // `name` is required as a recursive component
    components: {tdAddr,tdYn,tdColor},
    props: ['row'], // from the parent FriendsTable (if exists)
    data () {
      const amINestedComp = !!this.row
      return {
        addr:'',
        supportBackup: false,
        supportNested: true,
        tblClass: 'table-bordered',
        // tblStyle: 'color: #666',
        pagination:false,
        //pageSizeOptions: [10, 20, 50, 100],
        //fixHeaderAndSetBodyMaxHeight :800,
        columns: (() => {
          const cols = [
            { title: '주소', field: 'addr',  tdComp:'tdAddr',thStyle:{width:'20%'}},
            { title: '통화', field: 'currency'},
            { title: '잔고', field: 'balance',sortable: true ,tdStyle:{width:'100px'}},
            { title: '거래량', field: 'tx_count'},
            { title: '요청시간', field: 'monitor_req_time'},
            { title: '거래확인시간', field: 'last_tx_time', tdComp: 'tdColor' },
            // { title: '주기', field: 'monitor_cycle_sec' },
            { title: '모니터링여부', field: 'monitor_yn',tdComp: 'tdYn' }
          ]
          const groupsDef = {
            Normal: ['addr', 'currency', 'monitor_cycle_sec'],
            Sortable: ['balance', 'tx_count', 'monitor_req_time','last_tx_time','tx_count']
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
        origin_data: [],
        total: 0,
        //selection: [],
        summary: {},
        // `query` will be initialized to `{ limit: 10, offset: 0, sort: '', order: '' }` by default
        // other query conditions should be either declared explicitly in the following or set with `Vue.set / $vm.$set` manually later
        // otherwise, the new added properties would not be reactive
        query: amINestedComp ? { uid: this.row.friends } : {},
        // any other staff that you want to pass to dynamic components (thComp / tdComp / nested components)
        xprops: {
          eventbus: new Vue()
        }
      }
    },
    watch: {
      query: {
        handler () {
          if(this.data.length==0){
            this.getData()
          }else{
            this.handleDataChange()
          }
        },
        deep: true
      }
    },
    methods: {
      handleDataChange () {
        dataHandler(this.query,this.origin_data,['addr','currency','addr_count','current_value'])
          .then(({ rows, total }) => {
            this.data = rows
            this.total = total
          })
      },
      getData: function () {
       const path = this.$rootPath + '/sql/get/monitor'
        this.$http.post(path)
          .then(response => {
            this.data = response.data
            this.origin_data = response.data
          })
          .catch(error => {
            if (error.response.status == '401') {
              alert('로그인 사용자만 이용가능합니다.')
            } else {
              alert('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
            }
          })
      },
      addMonitor: function () {
        let path = this.$rootPath + '/sql/put/monitor'
        const data = {'addr': this.addr, 'currency_id': 'eth', 'etc': 'blockTracer' }
        this.$http.post(path, data)
          .then(response => {
            alert(response.data.message)
            if (response.data.result_code == 'success') {
              this.getData()
            }
          })
          .catch(error => {
            if (error.response.status == 401) {
              alert('권한이 없습니다..')
            }
            alert('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
          })
      }
    }
  }
</script>
<style scoped>
  #monitoring-data-table {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin: 0px auto 0;
    width: 1200px;
    margin-bottom: 10px;
  }
  >>>th {
    background-color: #300d4f;
    padding: 5px;
    margin-bottom: 10px;
    text-align: center;
    color: white;
  }
</style>

