<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import 'common/css/mixin/_clearfix.scss';
@import "common/css/mixin/_var.scss";
@import 'common/css/mixin/_normalize.scss';
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;
  height:100%;
  background: $bgc_ece;
}
.clearfix {
  @include clearfix;
}
</style>
