<template>
  <div id="data-table">
    <datatable v-bind="$data">
      <!--<button class="btn btn-default" @click="alertSelectedUids" :disabled="!selection.length">-->
      <!--<i class="fa fa-commenting-o"></i>-->
      <!--Alert selected uid(s)-->
      <!--</button>-->
    </datatable>
  </div>
</template>
<script>
  import dataHandler from './_dataHandler'
  import fromAddr from './customTd/td-origin-from-addr'
  import toAddr from './customTd/td-origin-to-addr'

  export default {
    name: 'FriendsTable', // `name` is required as a recursive component
    components: {fromAddr,toAddr},
    props: [], // from the parent FriendsTable (if exists)
    data () {
      const amINestedComp = !!this.row
      return {
        supportBackup: false,
        supportNested: true,
        tblClass: 'table-bordered',
        //tblStyle: 'table-layout: fixed', // must
        pagination:false,
        pageSizeOptions: [50,100,200,300],
        //fixHeaderAndSetBodyMaxHeight :800,
        columns: (() => {
          const cols = [
            { title: '거래시간', field: 'tx_time',  sortable: true, visible: 'true'},
            { title: 'From', field: 'from',thComp: 'FilterTh'  ,tdComp:'fromAddr',sortable: true},
            { title: 'To', field: 'to',thComp: 'FilterTh'  ,tdComp:'toAddr',sortable: true },
            { title: '거래금액', field: 'tx_amount',sortable: true,tdStyle: 'text-align:right'},
            { title: '통화', field: 'currency', sortable: true},
            { title: 'Original From', field: 'origin_from', visible: false},
            { title: 'Original To', field: 'origin_to', visible: false },
            { title: 'addr', field: 'addr', visible: false },

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
        //selection: [],
        summary: {},
        // `query` will be initialized to `{ limit: 10, offset: 0, sort: '', order: '' }` by default
        // other query conditions should be either declared explicitly in the following or set with `Vue.set / $vm.$set` manually later
        // otherwise, the new added properties would not be reactive
        query: amINestedComp ? { uid: this.row.friends } : { limit: 50, offset: 0, sort: '', order: '' },
        // any other staff that you want to pass to dynamic components (thComp / tdComp / nested components)
        xprops: {
          eventbus: new Vue()
        }
      }
    },
    watch: {
      query: {
        handler () {

          if(this.data.length!==0){
            this.handleDataChange()
          }
        },
        deep: true
      }
    },
    methods: {
      handleDataChange () {
        console.log("handleDataChange")
        console.log(this)

        dataHandler(this.query,this.origin_data,['tx_time','from','to','tx_amount','currency'])
          .then(({ rows, total }) => {
            this.data = rows
            this.total = total
          })
      },
      getData(addr){

        const path = this.$rootPath + '/node/get/wallet/list'
        const data = {addr:addr,size:50}

        this.$http.post(path,data)
          .then(response => {
            console.log(this)
            this.data = response.data.data_list
            this.origin_data = response.data.data_list
            this.$parent.deal = response.data.total
            this.total = response.data.data_list.length
          })
          .catch(error => {
            alert('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
          })
      },
      getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
          vars[key] = value;
        });
        return vars;
      }
    },
    mounted(){

      const urlData = this.getUrlVars();
      this.addr = urlData.addr
      this.getData(this.addr)

    }
  }
</script>
<style scoped>
  >>>.-page-size-select {
    display: inline-block;
    width: 65px;
  }
</style>

