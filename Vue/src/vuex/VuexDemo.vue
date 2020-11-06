<template>
  <div>
    <div>{{ $store.state.count }}</div>
    <button @click="add">加二</button>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      // this.$store.commit('ADD', 2)
      this.$store.dispatch('add', 2)
    },
  },
}
</script>

<style>
</style>