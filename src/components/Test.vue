<template>
  <div id="container" class="sub unusual">
    <Analysis></Analysis>
    <TestGrid></TestGrid>
  </div>
</template>
<script>
  import Analysis from './Analysis'
  import TestGrid from './TestGrid'

  export default {
    components: {Analysis, TestGrid},
    name: 'Test'
  }
</script>

<style scoped>
  th {
    background-color: #300d4f;
    padding: 5px;
    margin-bottom: 10px;

    text-align: center;
    color: white;
  }
</style>
