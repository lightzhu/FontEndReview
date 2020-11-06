<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  inject: ['form'], // 接收父组件provide的数据
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      error: '',
    }
  },
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate() {
      console.log('校验')
      // 规则
      const rules = this.form.rules[this.prop]
      // 当前值
      const value = this.form.model[this.prop]

      // const desc = { [this.prop]: rules }
      // console.log(rules, desc)
      if (!value) {
        this.error = rules[0].message
      } else {
        this.error = ''
      }
    },
  },
}
</script>

<style>
</style>>