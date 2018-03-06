<template>
    <div id="echars" v-option="echarse" style=" background: #fff;"></div>
</template>

<script>
import Vue from 'vue'
// const echarts = require('echarts/lib/echarts')
// const pie = require('echarts/lib/chart/pie')
// const line = require('echarts/lib/chart/line')
// const title = require('echarts/lib/component/title')
var echarts = require('echarts');
export default {
  props:{
    //父组件传过来的参数
     echarse:Object
  },
  //用指令来渲染dom
  directives:{
     option:{
        //被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
        inserted:function(el, binding, vnode){
            console.log(binding.value)
            //数据
            const opts = binding.value
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(el);
            //形成虚拟的节点好复用
            vnode.context.myChart = myChart
            // 绘制图表

            myChart.setOption(opts,true)
        },
        update: function (el, binding, vnode) {
            const opts = binding.value
            vnode.context.myChart.setOption(opts,true)
        }
     }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
