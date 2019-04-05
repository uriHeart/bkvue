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

  import tdAddr from './customTd/td-addr'

  export default {
    name: 'FriendsTable', // `name` is required as a recursive component
    components: {tdAddr},
    props: ['row'], // from the parent FriendsTable (if exists)
    data () {
      const amINestedComp = !!this.row
      return {
        supportBackup: false,
        supportNested: true,
        tblClass: 'table-bordered',
        // tblStyle: 'color: #666',
        pagination:true,
        pageSizeOptions: [20, 50, 100],
        //fixHeaderAndSetBodyMaxHeight :800,
        columns: (() => {
          const cols = [
            { title: '사기주소', field: 'address', tdComp:'tdAddr' },
            { title: '사기주소 수신금액', field: 'fakeValue', sortable: true},
            { title: '일반주소 평균 수신금액', field: 'avgReceiveValue'},
            { title: '일반주소 수신 횟수', field: 'receiveCount'}
          ]
          const groupsDef = {
            Normal: ['address', 'fakeValue']
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
        total: 0,
        //selection: [],
        summary: {},
        query: amINestedComp ? { uid: this.row.address } : {  },
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
        const path = this.$rootPath + '/es/get/compare/amount/double'
        let sort = this.query.sort =='' ? 'fakeFloatValue' : this.query.sort =='fakeValue' ? 'fakeFloatValue' :this.query.sort
        let order = this.query.order =='' ? 'desc' : this.query.order
        const data = {size:this.query.limit, sort:sort, page:this.query.offset, order:order}
        this.$http.post(path,data)
          .then(response => {
            console.log(response)
            this.data = response.data.data_list
            this.total = response.data.total

          })
          .catch(error => {
            console.log(error);
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

