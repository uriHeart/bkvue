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

  export default {
    name: 'FriendsTable1', // `name` is required as a recursive component
    components: {},
    props: ['row'], // from the parent FriendsTable (if exists)
    data () {
      const amINestedComp = !!this.row
      return {
        supportBackup: false,
        supportNested: true,
        tblClass: 'table-bordered',
        //tblStyle: 'table-layout: fixed', // must
        pagination:false,
        //fixHeaderAndSetBodyMaxHeight :800,
        columns: (() => {
          const cols = [
            { title: '통화', field: 'currency',  sortable: true, visible: 'true'},
            { title: '받은금액', field: 'receive_value',thComp: 'FilterTh' ,sortable: true},
            { title: '받은건수', field: 'receive_count',thComp: 'FilterTh' ,sortable: true },
            { title: '보낸금액', field: 'send_value',sortable: true,tdStyle: 'text-align:right'},
            { title: '보낸건수', field: 'send_count', sortable: true}
          ]
          const groupsDef = {
            Normal: ['currency','receive_value','receive_count','send_value','send_count']
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

        dataHandler(this.query,this.origin_data,['currency','receive_value','receive_count','send_value','send_count'])
          .then(({ rows, total }) => {
            this.data = rows
            this.total = total
          })
      },
      getData(addr){

        const path = this.$rootPath + '/node/wallet/accumulation'
        const data = {addr: addr,size:3000}

        this.$http.post(path,data)
          .then(response => {
            console.log(this)
            this.data = response.data
            this.origin_data = response.data
            this.total = response.data.length
            this.handleDataChange()

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

