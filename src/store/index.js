import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex)

//我们保存的状态
const state = {
    user: {
        name: "admin"
    },
    module: {
        series: [],
        name: [],
        time: []
    },
    selected: {},
    bar: {
        xAxis: [],
        yAxis: []
    },
    //保存table数据，切换柱状图的时候得重新加载
    table: {},
    //测试环境
    // ajaxUrl: 'http://200.1.3.106:1120',
    //正式环境
    ajaxUrl: 'http://sc.91onix.com'


}
export default new Vuex.Store({
    state,
    mutations
})