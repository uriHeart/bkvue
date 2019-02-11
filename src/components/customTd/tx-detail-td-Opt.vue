<template>
  <div class="btn-group btn-group-sm">
    <button class="btn btn-default" title="Display row"
      :class="{ '-nested-comp-open-btn': isDisplayRowVisible }"
      @click="toggleNestedComp('nestedDisplay')">
      <i class="fa fa-list-ul"></i>
    </button>
  </div>
</template>
<script>

export default {
  props: ['row', 'nested'],
  mounted () {
  $(this.$el).find('button[title]').tooltip()
  },
  computed: {
    isDisplayRowVisible () {
      if (this.nested.comp !== 'nestedDisplay') return
      return this.nested.visible
    }
  },
  methods: {
    toggleNestedComp (comp) {
      const { nested } = this
      if (nested.comp === comp) return nested.$toggle()
      nested.$toggle(comp, true)
    }
  }
}
</script>
<style>
.-nested-comp-open-btn {
  color: #fff !important;
  background-color: #337ab7 !important;
}
</style>
