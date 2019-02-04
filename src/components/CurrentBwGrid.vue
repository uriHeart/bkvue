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
    name: 'FriendsTable', // `name` is required as a recursive component
    props: ['row'], // from the parent FriendsTable (if exists)
    data () {
      const amINestedComp = !!this.row
      return {
        supportBackup: false,
        supportNested: true,
        tblClass: 'table-bordered',
        // tblStyle: 'color: #666',
        pagination:true,
        pageSizeOptions: [10, 20, 50, 100],
        //fixHeaderAndSetBodyMaxHeight :800,
        columns: (() => {
          const cols = [
            { title: 'Coin', field: 'currency_id',  sortable: true, visible: 'true' },
            { title: '코인명', field: 'name', visible: true, thComp: 'FilterTh' },
            { title: 'BW 등록수', field: 'total',sortable: true },
            { title: 'Update 날짜', field: 'update_date',sortable: true }
          ]
          const groupsDef = {
            Normal: ['currency_id', 'name', 'Create update_date', 'total'],
            Sortable: ['currency_id', 'total', 'Create update_date']
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
        selection: [],
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
        console.log("data:")
        console.log(this.data)
        dataHandler(this.query,this.origin_data,['currency_id','name','total','update_date','avail_count','exist_value_count'])
          .then(({ rows, total }) => {
            this.data = rows
            this.total = total
          })
      },
      getData(){
        const path = this.$rootPath + '/sql/get/black/sum/avail'
        this.$http.post(path)
          .then(response => {
            this.data = response.data
            this.origin_data = response.data
            this.handleDataChange()

          })
          .catch(error => {
            alert('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
          })
      },
      alertSelectedUids () {
        alert(this.selection.map(({ uid }) => uid))
      }
    }
  }
</script>

<style scoped>
  #data-table {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin: 0px auto 0;
    width: 1000px;
  }
  >>>th {
    background-color: #300d4f;
    padding: 5px;
    margin-bottom: 10px;
    text-align: center;
    color: white;
  }
</style>

