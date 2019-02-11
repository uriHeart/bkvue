<template>
  <div class="-nested-dsp-row-comp">
    <button class="btn btn-xs btn-link -nested-dsp-row-close-btn"
      @click="nested.$toggle(false)">
      <i class="fa fa-times fa-lg"></i>
    </button>
    <dl class="dl-horizontal">
      <template>
        <dt>Hash</dt><dd>{{ row.hash }}</dd>
        <dt>Block Number</dt><dd>{{ row.blockNumber }}</dd>
        <dt>Value</dt><dd>{{ row.floatValue }}</dd>

        <dt v-if="row.contract_address!=''">Contract Address</dt><dd>{{ row.contract_address }}</dd>

        <dt>From</dt><dd>{{ row.from }}</dd>
        <dt>To</dt><dd>{{ row.to }}</dd>
        <dt>Currency</dt><dd>{{ row.currency }} ({{ row.tokenName}})</dd>
        <dt>Tx Time Seoul</dt><dd>{{ row.timestampSeoul }}</dd>
      </template>
    </dl>
  </div>
</template>
<script>
export default {
  props: ['row', 'nested']
}
</script>
<style>
.-nested-dsp-row-comp {
  position: relative;
  padding: 10px;
}
.-nested-dsp-row-close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
