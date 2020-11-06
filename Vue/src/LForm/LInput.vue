<template>
  <div>
    <input v-bind="$attrs" :value="value" @input="onInput" @blur="validate" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    // type: {
    //   type: String,
    //   default: 'text',
    // },
  },
  methods: {
    onInput(e) {
      // console.log(e.target.value)
      this.$emit('input', e.target.value)
    },
    validate() {
      this.$parent.$emit('validate')
    },
  },
}
</script>

<style>
</style>