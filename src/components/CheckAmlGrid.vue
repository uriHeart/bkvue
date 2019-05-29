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
    props: ['row', 'score'], // from the parent FriendsTable (if exists)
    data () {
      const amINestedComp = !!this.row
      return {
        supportBackup: false,
        supportNested: true,
        tblClass: 'table-bordered',
        pagination:true,
        pageSizeOptions: [50, 100, 200, 300],
        columns: (() => {
          const cols = [
            { title: '자금세탁흐름', field: 'flow',  sortable: false},
            { title: '일련번호', field: 'label',sortable: false},
            { title: '사기주소', field: 'address',  sortable: false,tdComp:'tdAddr'}
          ]
          const groupsDef = {
            Normal: ['aml_addr', 'label']
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
        loading: true,
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

        dataHandler(this.query,this.origin_data,['aml_addr','label'])
          .then(({ rows, total }) => {
            this.data = rows
            this.total = total
          })
      },
      getData(addr){
        this.loading = true
        const path = this.$rootPath + '/es/get/aml/list'
        const data = {addr:addr}

        this.$http.post(path,data)
          .then(response => {
            this.loading = false
            this.data = response.data.data_list
            this.origin_data = response.data.data_list
            this.total = response.data.total
            this.score[4].message= this.total+"건"
            this.handleDataChange()
          })
          .catch(error => {
            this.loading = false
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

