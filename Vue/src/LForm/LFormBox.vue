<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  provide() {
    return {
      form: this,
    }
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
    },
  },
  methods: {
    validate(cb) {
      console.log(cb)
      this.$children.forEach((item) => {
        item.validate()
      })
    },
  },
}
</script>

<style>
</style>