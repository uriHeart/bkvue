<template>
  <div>{{ value }}
    <input type="button" value="재요청" @click=againMonitor>
    <input type="button" value="삭제" @click=delMonitor>
  </div>
</template>
<script>
export default {
  props: ['row','value','data','xprops'],
  methods: {
  delMonitor: function () {
    let addr = this.row.addr
    const path = this.$rootPath + '/sql/del/monitor'
    const data = {'addr': addr, 'currency_id': 'eth' }
    this.$http.post(path, data)
      .then(response => {
        alert(response.data.message)
        this.getData()
      })
      .catch(error => {
        alert('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
      })
  },
  againMonitor: function () {
    let addr = this.row.addr
    const path = this.$rootPath + '/sql/update/monitor'
    const data = {'addr': addr, 'currency_id': 'eth' }
    this.$http.post(path, data)
      .then(response => {
        alert(response.data.message)
        this.getData()
      })
      .catch(error => {
        alert('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
      })
   },getData: function () {
      const path = this.$rootPath + '/sql/get/monitor'
      this.$http.post(path)
        .then(response => {
          console.log(this)
           this.$parent.data = response.data
        })
    }
  }
}
</script>
