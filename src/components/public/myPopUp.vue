<template>
  <div id="myPopUp">
    <el-popover ref="popover5" placement="top" width="900" v-model="visible2">
      <span class="icon iconfont icon-guanbi"></span>
      <div class="clearfix popCon">
        <echar :echarse="option2" ></echar>
        <Tb :table="table"></Tb>
      </div>
    </el-popover>
    <el-button v-popover:popover5>删除</el-button>
  </div>
</template>
<script>
import echar from '../public/echars'
import Tb from '../public/table'
const echarColor = ["#0099ff","#ffcc33","#99cc33","#ff9999","#9999cc","#0066cc","#ff9966","#00cc99","#ff6699","#ffff00"]
export default{
    name: 'pop',
    data() {
      return {
        visible2: false,
        myChart:Object,
        option9:{
          title : {
              text: '某站点用户访问来源',
              subtext: '纯属虚构',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          grid: {
            right: 50
          },
          toolbox: {
            feature: {
              saveAsImage: {
                  pixelRatio: 2,
                  title: '保存'
              }
            }
          },
          series : [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:335, name:'直接访问'},
                      {value:310, name:'邮件营销'},
                      {value:234, name:'联盟广告'},
                      {value:135, name:'视频广告'},
                      {value:1548, name:'搜索引擎'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
        },
        table:{
          tableHeader:[
            {
              prop:"dpi",
              label:"分辨率",
              width:440
            },
            {
              prop:"number",
              label:"使用数量",
            width:440
            }
          ],
          tableCon:[
            {
              dpi: '1920*1080',
              number: 500
            },
            {
              dpi: '1440*900',
              number: 500
            },
            {
              dpi: '1366*768',
              number: 500
            },
            {
              dpi: '1280*800',
              number: 500
            },
            {
              dpi: '1024*768',
              number: 500
            }
          ]
        }

      };
    },
    components:{
      echar,
      Tb
    }
  }
</script>
<style lang="scss">
.popCon {
  #echars {
    width: 880px;
    height: 400px;
  }
}

.el-popover {
  position: relative;
  width: 900px;

  .icon-guanbi {
    position: absolute;
    top: 10px;
    right: -50px;

    cursor: pointer;
  }
}

.popCon {
  padding: 20px 0 0;
}

</style>

