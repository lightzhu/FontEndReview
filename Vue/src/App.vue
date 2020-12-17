<template>
  <div id="main">
    <router-link to="/home">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/vuex">VuexDemo</router-link>
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive> -->
    <router-view />
    <!-- <RouterDemo /> -->
    <router-link to="/communicate"></router-link>
  </div>
</template>

<script>
import RouterDemo from '@/vue-router/RouterDemo'
export default {
  name: 'App',
  components: { RouterDemo },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
}
</script>

<style>
#app {
  line-height: 1.42;
  position: relative;
  width: 100%;
  height: 100%;
  margin-right: auto;
  margin-left: auto;
  color: #333;
  -webkit-overflow-scrolling: touch;
  padding-top: 0;
}
#app.headIsShow {
  padding-top: 88px;
}
input {
  height: 40px;
  outline: none;
}
[v-cloak] {
  display: none;
}
</style>
