<template>
  <div>
    <div style="height:100px"> 상세조회</div>

    <div class="list_wrap" >
      <div class="text_wrap" style="padding: 0px">
        <table class="check_list">
          <tr>
            <th>주소</th>
            <td>{{addr}}</td>
          </tr>
          <tr>
            <th>잔고</th>
            <td>{{etherValue}} Ether</td>
          </tr>
        </table>
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
        //tblStyle: 'table-layout: fixed', // must
        pagination:true,
        pageSizeOptions: [20,50,100,200],
        //fixHeaderAndSetBodyMaxHeight :800,
        columns: (() => {
          const cols = [
            { title: '', field: 'custom', tdComp:'opt'},
            { title: 'Hash', field: 'hash', tdComp:'hash', tdStyle:'display:inline-block; text-overflow: ellipsis; overflow: hidden; width:150px;',thStyle:'width:150px'},
            { title: 'Block', field: 'blockNumber'},
            { title: '거래시간', field: 'timestampSeoul',  sortable: true, tdStyle:'width:200px'},
            { title: 'From', field: 'from',thComp: 'FilterTh'  ,tdComp:'fromAddr',sortable: true},
            { title: 'To', field: 'to',thComp: 'FilterTh'  ,tdComp:'toAddr',sortable: true },
            { title: '거래금액', field: 'floatValue',sortable: true,tdStyle: 'text-align:right'},
            { title: '통화', field: 'currency'},
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
        origin_data: [],
        total: 0,
        addr:'',
        etherValue:'',
        //selection: [],
        summary: {},
        // `query` will be initialized to `{ limit: 10, offset: 0, sort: '', order: '' }` by default
        // other query conditions should be either declared explicitly in the following or set with `Vue.set / $vm.$set` manually later
        // otherwise, the new added properties would not be reactive
        query: amINestedComp ? { uid: this.row.friends } : { limit: 20, offset: 0, sort: '', order: '' },
        // any other staff that you want to pass to dynamic components (thComp / tdComp / nested components)
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
        this.getData(this.addr)
      },
      getValue(addr){
        const path = this.$rootPath + '/eth/get/ether/value'

        this.$http.post(path,{'addr':addr})
          .then(response => {
            this.etherValue = response.data.value
          })
          .catch(error => {
            console.log(error);
          })
      },
      getData(addr){
        const path = this.$rootPath + '/es/tx/detail/list'
        let sort = this.query.sort =='' ? 'blockNumber' : this.query.sort
        let order = this.query.order =='' ? 'desc' : this.query.order
        const data = {addr:addr, size:this.query.limit, sort:sort, page:this.query.offset, order:order}

        this.$http.post(path,data)
          .then(response => {
            this.data = response.data.data_list
            this.total = response.data.total
            this.data.forEach((item, index, array) =>{
              this.getErc20(item)
            })
          })
          .catch(error => {
            console.log(error);
          })
      },
      getErc20(row){
        const path = this.$rootPath + '/node/erc20/data'
        const data = row
        this.$http.post(path,data)
          .then(response => {

            if(response.data.result_code == "Erc20"){

              response.data.erc20_data.map(row=>{
                this.data.push(row)
                this.data.sort(function (a,b) {
                  return b.blockNumber -a.blockNumber || a.hash.localeCompare(b.hash)
                })
              })

            }
          })
          .catch(error => {
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
      const urlData = this.getUrlVars();
      this.addr = urlData.addr
      this.getData(this.addr)
      this.getValue(this.addr)
    }
  }
</script>
<style scoped>
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

