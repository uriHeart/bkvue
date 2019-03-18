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
  import tdAddr from './customTd/td-addr'

  export default {
    name: 'FriendsTable', // `name` is required as a recursive component
    components: {tdAddr},
    props: ['row','searchAddr'], // from the parent FriendsTable (if exists)
    data () {
      const amINestedComp = !!this.row
      return {
        supportBackup: false,
        supportNested: true,
        tblClass: 'table-bordered',
        //tblStyle: 'table-layout: fixed', // must
        pagination:true,
        pageSizeOptions: [50,100,200,300],
        //fixHeaderAndSetBodyMaxHeight :800,
        columns: (() => {
          const cols = [
            { title: '사기주소', field: 'black_addr',  sortable: true,tdComp:'tdAddr'},
            { title: '일련번호', field: 'label',sortable: true},
            { title: 'from_addr', field: 'from_addr',thComp: 'FilterTh'  ,visible: 'false',sortable: true }
          ]
          const groupsDef = {
            Normal: ['black_addr', 'label']
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
        addr:'',
        total: 0,
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

        dataHandler(this.query,this.origin_data,['black_addr','label','from_addr'])
          .then(({ rows, total }) => {
            this.data = rows
            this.total = total
          })
      },
      getData(addr){

        const path = this.$rootPath + '/es/get/black/rel/list'
        const data = {addr:addr,size:3000}

        this.$http.post(path,data)
          .then(response => {
            console.log(this)
            this.data = response.data
            this.origin_data = response.data
            this.total = response.data.length
            this.handleDataChange()

          })
          .catch(error => {
            console.log('CheckBlackGrid.vue')
            console.log(error)
            // alert('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
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

