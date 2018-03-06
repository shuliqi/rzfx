<template>
<div>
    <el-table
      :data="table.tableCon"
      @cell-click="cell"
      @cell-mouse-enter="mouseHover"
      @cell-mouse-leave ="mouseLeave"
      :max-height="table.maxHeight"
      style="width: 100%">
      <template
       v-for="item in table.tableHeader">
            <el-table-column
              v-if="item.see"
              :key="item.prop"
              :type="item.type"
              :width="item.width"
              :prop="item.prop"
              :align="item.align"
              :label="item.label">
                <template scope="scope">
                    <span class="radius"  :style="{ background:scope.row.color}"></span>
                </template>
            </el-table-column>
            <el-table-column
              v-else-if="item.browser"
              :key="item.prop"
              :type="item.type"
              :width="item.width"
              :prop="item.prop"
              class-name="pointer"
              :align="item.align"
              :label="item.label">
                <template scope="scope">
                    <i class="iconfont icon-browser"></i>
                </template>
            </el-table-column>
            <el-table-column
              v-else-if="item.look"
              :key="item.prop"
              :type="item.type"
              :width="item.width"
              class-name="pointer"
              :align="item.align"
              :prop="item.prop"
              :label="item.label">
                <template scope="scope">
                    <i class="iconfont icon-See"></i>
                </template>
            </el-table-column>
            <el-table-column
              v-else-if="item.color"
              :key="item.prop"
              class-name="pointer"
              :type="item.type"
              :align="item.align"
              :width="item.width"
              :prop="item.prop"
              :render-header="renderHeader"
              :label="item.label">
            </el-table-column>
            <el-table-column
              v-else-if="item.power"
              :key="item.prop"
              class-name="pointer"
              :type="item.type"
              :width="item.width"
              :align="item.align"
              :prop="item.prop"
              :label="item.label">
                <template scope="scope">
                    <i class="iconfont icon-fenbianshuai"></i>
                </template>
            </el-table-column>
            <el-table-column
              v-else-if="item.userActive"
              :key="item.prop"
              :type="item.type"
              :width="item.width"
              class-name="pointer"
              :align="item.align"
              :prop="item.prop"
              :label="item.label">
                <template scope="scope">
                    {{scope.row.userActive}}
                    <i  class="iconfont see icon-See"></i>
                </template>
            </el-table-column>
            <el-table-column
              v-else-if="item.ip"
              :key="item.prop"
              :type="item.type"
              :width="item.width"
              class-name="pointer"
              :align="item.align"
              :prop="item.prop"
              :label="item.label">
                <template scope="scope">
                    {{item.label}}
                     <i  class="iconfont see icon-See"></i>
                </template>
            </el-table-column>
            <el-table-column
              v-else-if="item.address"
              :key="item.prop"
              :type="item.type"
              :width="item.width"
              class-name="pointer"
              :align="item.align"
              :prop="item.prop"
              :label="item.label">
                <template scope="scope">
                    {{scope.row.address}}
                    <i  class="iconfont  jiantou icon-jiantou1"></i>
                </template>
            </el-table-column>
            <el-table-column
              v-else
              :key="item.prop"
              :type="item.type"
              :width="item.width"
              :align="item.align"
              :prop="item.prop"
              :label="item.label"
              >
            </el-table-column>
          </template>
    </el-table>
</div>
</template>

<script>
import Vue from 'vue'
const echarColor = ["#0099ff","#ffcc33","#99cc33","#ff9999","#9999cc","#0066cc","#ff9966","#00cc99","#ff6699","#ffff00"]
let mysum = 5
export default {
  data(){
    return {
       color:'#ccc',
       sum:true,
       color:"#ccc",
    }
  },
  props:{
    //父组件传过来的参数
     table:Object
  },
  created(){
  },
  beforeUpdate(){
      // this.sum = this.table.tableCon.length
  },
  methods:{
    mouseHover(row, column, cell, event){
      if(column.label === "用户活跃量"){
        console.log("111")
          row.usershow = true
      }
      else if(column.label === "IP数"){
          console.log("ipshow")
          row.ipshow = true
      }
    },
    mouseLeave(row, column, cell, event){
       if(column.label === "用户活跃量"){
        console.log("222")
          row.usershow = false
      }
      else if(column.label === "IP数"){
          row.ipshow = false
      }
    },
    ToFather(){
          this.$emit("listnerFromChild","my is child")
    },
    cell(row, colunm, cell, event){
      if(colunm.label === '浏览器'){
        this.$emit("listnerFromChild",{
            dialogVisible:true,
            type:row.type,
            state:"browser",
            AreaCode:row.AreaCode,
            AreaName:row.address,
            ProjectCode:row.ProjCode,

        })
      }else if(colunm.label === '分辨率'){
          this.$emit("listnerFromChild",{
            dialogVisible:true,
            type:row.type,
            state:"dpi",
            AreaCode:row.AreaCode,
            AreaName:row.address,
            ProjectCode:row.ProjCode,

          })
      }else if(colunm.label === '地区'){

        if(row.type ==="area"){
          //地区下的说有项目

          let data = {
            AreaCode:row.AreaCode,
            ProjectCode:"全部",
            category:'project',
            ModuleCode:"",
          }
          this.$emit("listnerFromChild",data)
        }
        else if(row.type ==="project"){
          //项目下的所有模块
          let data = {
            AreaCode:row.AreaCode,
            ProjectCode:row.ProjCode,
            category:'module',
            ModuleCode:"全部",
            save:true,
          }
          this.$emit("listnerFromChild",data)
        }

      }else if(colunm.label == "查看详情"){
         let data = {
            ProjCode:row.ProjCode,
            ModuleCode:row.ModuleCode,
            type:"module"
          }
          this.$emit("listnerFromChild",data)
      }
      else if(colunm.label === '用户活跃量'){
          this.$emit("listnerFromChild",{
            dialogVisible:true,
            type:row.type,
            state:"userActive",
            AreaName:row.address,
            AreaCode:row.AreaCode,
            ProjectCode:row.ProjCode,
          })
      }
       else if(colunm.label === 'IP数'){
          this.$emit("listnerFromChild",{
            dialogVisible:true,
            type:row.type,
            state:"ip",
            AreaName:row.address,
            AreaCode:row.AreaCode,
            ProjectCode:row.ProjCode,
          })
      }
      //显示功能
      // else if(colunm.label == "显示"){
      //   console.log("显示")
      //   console.log(row.state)
      //   if(row.state !== undefined){
      //         //mysum:3表示只可以置灰 并且当前有颜色
      //         if(mysum === 5 && row.state){
      //             row.color = "#ccc"
      //             let data = {
      //               see:true,
      //               moduledata:row
      //             }
      //             this.$emit("listnerFromChild",data)
      //             row.state = !row.state
      //         }else if( mysum !== 5 && !row.state){
      //             row.color = echarColor[row.index]
      //             let data = {
      //               see:true,
      //               moduledata:row
      //             }
      //             this.$emit("listnerFromChild",data)
      //             row.state = !row.state
      //         }else if(mysum !== 5 && row.state){
      //             row.color = "#ccc"
      //             let data = {
      //               see:true,
      //               moduledata:row
      //             }
      //             this.$emit("listnerFromChild",data)
      //             row.state = !row.state
      //         }
      //         mysum = 0
      //         for(let i = 0; i < this.table.tableCon.length;i++){
      //           if(this.table.tableCon[i].state){
      //              mysum = mysum + 1
      //           }
      //         }
      //   }

      // }
    },
    renderHeader(ele, {column, $index}){
        	return ele(
          	'span',
            {},
            [
            	ele('i',{
                    class: 'cycle',
                    style:{
                      background:this.table.tableHeader[$index].color
                    }
                }),
              column.label
            ]
          )
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .el-table {
    .shuliqi {
      width: 10px;
      height: 10px;
      background: red;
    }

    .see,.jiantou {
      margin-right: -12%;

      &:hover:before {
        color: #24a5e0;
      }
    }
    .jiantou{
      color:#a9a1a1;
      font-size:16px;
    }
    .pointer {
      cursor: pointer;
    }

    .iconfont {
      margin-left: 10px;
    }

    .icon-fbh:hover:before,
    .jiantou:hover:before,
    .icon-br:hover:before {
      color: #24a5e0;
    }

    .radius {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      margin: 0 auto;
      background: red;
    }

    th {
      text-align: center;
    }
  }

  .cycle {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin: 0 4px;
  }

</style>
