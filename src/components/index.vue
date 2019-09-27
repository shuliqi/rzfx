<template>
	<div class="index" v-loading.body="loading">
		<el-dialog
			:title="dialog.title"
			:visible.sync="dialog.dialogVisible"
			size="tiny">
			<div class="myDialog" v-show="echarShow">
				<echar :echarse="option9"></echar>
			</div>
			<div class="myDialogtable">
        <div class="pop"></div>
        <div class="mytable">
        	<Tb :table="dialogTable"></Tb>
        </div>
			</div>
		</el-dialog>
    <el-dialog
			:title="mydialog.title"
			:visible.sync="mydialog.dialogVisible"
			size="tiny">
      <Tb :table="mytable"></Tb>
		</el-dialog>
		<vHead></vHead>
		<div class="select">
			<div class="select_main" ref="select_main">
				<div class="selIn fl">
					<span class="tit">地sdsd区：</span>
					<div class="yin">
						<span  class="valueBox">{{ select.valueD }}</span>
						<i class="icon iconfont icon-xiala"></i>
					</div>
					<el-select
						v-model="select.valueD"
						no-data-text="全部"
						@change="changeD"
						@visible-change="visibleChange"
						class="fl"
						@mouseenter.native="showPop"
						@mouseleave.native="hidePop"
						:data-num="0">
						<el-option
							v-for="item in select.optionsD"
							:key="item.Id"
							:AreaCode="item.item"
							:Isdelete="item.Isdelete"
							:label="item.AreaName"
							:value="item.AreaName">
						</el-option>
					</el-select>
				</div>
				<div class="selIn fl">
					<i v-if="select.proTxtX" class="proTxtX">请先选择一个指定地区</i>
					<span v-if="select.optionalX" class="tit">项目</span>
					<span v-else class="tit">项目：</span>
					<div class="yin" :class="{ yinRe : select.optionalX}">
						<span class="valueBox">{{ select.valueX }}</span>
						<i class="icon iconfont icon-xiala"></i>
					</div>
					<el-select
						v-model="select.valueX"
						:disabled="select.disabledX"
						placeholder=""
						@click.native="promitX"
						@change="changeX"
						@visible-change="visibleChange"
						@mouseenter.native="showPop"
						@mouseleave.native="hidePop"
						:data-num="1">
						<el-option
							v-for="item in select.optionsX"
							:key="item.AreaCode"
							:label="item.ProjectName"
							:value="item.ProjectName"
							:disabled="item.disabled">
						</el-option>
					</el-select>
				</div>
				<div class="selIn fl">
					<i v-if="select.proTxtM" class="proTxtM">请先选择一个指定项目</i>
					<span v-if="select.optionalM" class="tit">模块</span>
					<span v-else class="tit">模块：</span>
					<div class="yin" :class="{ yinRe : select.optionalM}">
						<span class="valueBox">{{ select.valueM }}</span>
						<i class="icon iconfont icon-xiala"></i>
					</div>
					<el-select
						v-model="select.valueM"
						:disabled="select.disabledM"
						placeholder=""
						@click.native="promitM"
						@change="changeM"
						@visible-change="visibleChange"
						@mouseenter.native="showPop"
						@mouseleave.native="hidePop"
						:data-num="2">
						<el-option
							v-for="item in select.optionsM"
							:key="item.ModuleCode"
							:label="item.ModuleName"
							:value="item.ModuleName"
							:disabled="item.disabled">
						</el-option>
					</el-select>
				</div>
				<el-button type="primary" class="fl" @click="searchParent()">查询</el-button>
			</div>
		</div>
		<div class="echar">
			<div class="time">
			<el-date-picker v-model="value4"  type="daterange"  @change="dataTime":picker-options="pickerOptions2"  placeholder="选择时间范围"  align="left"></el-date-picker>
			</div>
			<div class="main_echar">
				<span  class="line icon iconfont icon-shujushixin" :class="{active: !highHight}" @click="lineShow"></span>
				<span  class="bar icon iconfont icon-zhuzhuangtu" :class="{active: highHight}" @click="barShow"></span>
        <div   v-show="nodata"class="nodata">暂时无数据</div>
        <echar v-show="!nodata" :echarse="option2"></echar>
			</div>
		</div>
		<div class="table">
			<div class="export">
        <div class="breadcrumb">
            <el-button v-for="(item,index) in breadcrumb" @click.stop="backButton(item.type,index)" type="text" v-bind:class="{moren:(index === breadcrumb.length -1)}" :disabled="index === breadcrumb.length -1 ">{{item.name}}
                <i v-show="!(index === breadcrumb.length -1) "class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
        </div>
        <a :href="download" download="w3logo"><el-button  icon="upload2">导出</el-button></a>
			</div>
			<div class="main_table">
				<Tb :table="table" v-on:listnerFromChild="formChild"></Tb>
			</div>
		</div>
		<span class="titlePop" v-show="showTit">
			{{ txt }}
			<i class="popArrow"></i>
		</span>
	</div>
</template>

<script>
import echar from './public/echars'
import Tb from './public/table'
import vHead from './public/header'
import myPopUp from '../components/public/myPopUp'
import { urlEncode,getTimeStr,judge } from '../common/js/unit.js'
const echarColor = ["#0099ff","#ffcc33","#99cc33","#ff9999","#9999cc","#0066cc","#ff9966","#00cc99","#ff6699","#ffff00"]
export default {
  name: 'index',
  data () {
    return {
      series:[],
      linetime:[],
      nodata:false,
      dialog:{
          dialogVisible:false,
          title:"",
      },
      mydialog:{
        dialogVisible:false,
        title:""
      },

      breadcrumb:[],
      echarShow:true,
      tableMudole:true,
      download:'',
      loading:false,
      selected:{},
      tableRe:false,
      module:false,
      screen:{
        AreaCode:'',
        ProjectCode:'',
        ModuleCode:''
      },
      time:{
          "starttime":getTimeStr('YYYY-MM-DD',(new Date()).getTime() - 3600 * 1000 * 24 * 7),
          "endtime":getTimeStr('YYYY-MM-DD',(new Date()).getTime()),
      },
      select:{
          valueD:'全部',
          dataD:[],
          dataX:[],
          dataM:[],
          valueX:'',
          valueM:'',
          disabledX:true,
          disabledM:true,
          proTxtX: false,
          proTxtM: false,
          optionalX:true,
          optionalM:true,
          onoff: true,
          num: new Number(),
          optionsD: [],
          optionsX: [
           {
             value: '发行端数据分析平台'
           },
           {
             value: '图书馆'
           }
         ],
         optionsM: [
           {
             value: '进货'
           },
           {
             value: '销售'
           }
          ]
      },
      index:{
        title:[]
      },
      option : {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
            selected: {
                '邮件营销' : false,
                '联盟广告' :false
            },
            // selectedMode:'single',
        },
        color:echarColor,
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
       ]
      },
      mianbaodata:{},
      table1:{
        //概览模块
        tableHeader:[
          {
            prop:"date",
            type:"index",
            label:"序号",
            width:100
          },
          {
            prop:"see",
            label:"显示",
            see:true,
            color:null
            // width:100
          },
          {
            prop:"module",
            label:"模块"
            // width:100
          },
          {
            prop:"num",
            label:"访问次数"
            // width:100
          },
          {
            prop:"pecent",
            label:"访问次数比"
            // width:100
          },
          {
            prop:"ip",
            label:"IP数"
            // width:100
          },
          {
            prop:"time",
            label:"访问总时长"
            // width:100
          },
          {
            prop:"timePecent",
            label:"访问时长占比"
            // width:100
          },
          {
            prop:"average",
            label:"平均访问时长"
            // width:100
          },
          {
            prop:"see",
            look:true,
            label:"查看详情"
          }
        ],
        tableCon:[
          // {
          //   module: '进货',
          //   color:"#0099ff",
          //   num: 1518,
          //   pecent:"23%",
          //   ip:2329423424,
          //   time:300,
          //   timePecent:"20%",
          //   average:1000

          // }, {
          //   module: '进货',
          //   num: 1518,
          //   pecent:"23%",
          //   ip:2329423424,
          //   time:300,
          //   color:"#ffcc33",
          //   timePecent:"20%",
          //   average:1000
          // }, {
          //   module: '进货',
          //   num: 1518,
          //   pecent:"23%",
          //   ip:2329423424,
          //   time:300,
          //   color:"#99cc33",
          //   timePecent:"20%",
          //   average:1000
          // }, {
          //   module: '进货',
          //   num: 1518,
          //   pecent:"23%",
          //   ip:2329423424,
          //   time:300,
          //   color:"#ff9999",
          //   timePecent:"20%",
          //   average:1000
          // },
          // {
          //   module: '进货',
          //   num: 1518,
          //   pecent:"23%",
          //   ip:2329423424,
          //   time:300,
          //   color:"#9999cc",
          //   timePecent:"20%",
          //   average:1000
          // },
          //  {
          //   module: '进货',
          //   num: 1518,
          //   pecent:"23%",
          //   ip:2329423424,
          //   time:300,
          //   color:"#ff9999",
          //   timePecent:"20%",
          //   average:1000
          // },
          // {
          //   module: '进货',
          //   num: 1518,
          //   pecent:"23%",
          //   ip:2329423424,
          //   time:300,
          //   color:"#ff9999",
          //   timePecent:"20%",
          //   average:1000
          // }
        ]
      },
      diqutable:{
        // 地区和项目
        tableHeader:[
          {
            prop:"date",
            type:"index",
            label:"序号",
            width:100
          },
          {
            prop:"address",
            label:"地区"
            // width:100
          },
          {
            prop:"num",
            label:"访问次数"
            // width:100
          },
          {
            prop:"userActive",
            label:"用户活跃量",
            userActive:true,
            // width:100
          },
          {
            prop:"ip",
            label:"IP数"
            // width:100
          },
          {
            prop:"time",
            label:"访问总时长"
            // width:100
          },

          {
            prop:"average",
            label:"平均访问时长"
            // width:100
          },
           {
            prop:"browser ",
            label:"浏览器",
            align: "left",
            browser:true
            // width:100
          },
           {
            prop:"power",
            label:"分辨率",
            align: "left",
            power:true
            // width:100
          }
        ],
        tableCon:[
          // {
          //   address:"上海",
          //   color:"#0099ff",
          //   num: 1518,
          //   userActive:"23%",
          //   ip:2329423424,
          //   time:300,
          //   timePecent:"20%",
          //   average:1000,

          // },
          // {
          //   address:"上海",
          //   color:"#0099ff",
          //   num: 1518,
          //   userActive:"23%",
          //   ip:2329423424,
          //   time:300,
          //   timePecent:"20%",
          //   average:1000,

          // },
          // {
          //   address:"上海",
          //   color:"#0099ff",
          //   num: 1518,
          //   userActive:"23%",
          //   ip:2329423424,
          //   time:300,
          //   timePecent:"20%",
          //   average:1000,

          // },
          // {
          //   address:"上海",
          //   color:"#0099ff",
          //   num: 1518,
          //   userActive:"23%",
          //   ip:2329423424,
          //   time:300,
          //   timePecent:"20%",
          //   average:1000,

          // },
          // {
          //   address:"上海",
          //   color:"#0099ff",
          //   num: 1518,
          //   userActive:"23%",
          //   ip:2329423424,
          //   time:300,
          //   timePecent:"20%",
          //   average:1000,

          // },
          // {
          //   address:"上海",
          //   color:"#0099ff",
          //   num: 1518,
          //   userActive:"23%",
          //   ip:2329423424,
          //   time:300,
          //   timePecent:"20%",
          //   average:1000,
          // },
          // {
          //   address:"上海",
          //   color:"#0099ff",
          //   num: 1518,
          //   userActive:"23%",
          //   ip:2329423424,
          //   time:300,
          //   timePecent:"20%",
          //   average:1000,
          // }
        ]
      },
      table3: {
        tableHeader:[
         {
            prop:"gongneng",
            label:"功能"
            // width:100
          },
          {
            prop:"TimeDimension",
            label:"时间维度",
            color:"#0099ff"
            // width:100
          },
          {
            prop:"PurDimension",
            label:"进货维度",
            color:"#ffcc33"
            // width:100
          },
          {
            prop:"TatalDimension",
            label:"统计维度",
            color:"#ff9999"
            // width:100
          },
          {
            prop:"BookDimension",
            label:"图书维度",
            color:"0099ff"
            // width:100
          },
          {
            prop:"publishTime",
            label:"出版时间",
            color:"#0099ff"
            // width:100
          },

          {
            prop:"classification",
            label:"分类维度",
            color:"#0099ff"
            // width:100
          },
           {
            prop:"edition",
            label:"版别搜索",
            color:"#9999cc"
            // width:100
          },
           {
            prop:"pin",
            label:"品种搜索",
            color:"#9999cc"
            // width:100
          },
          {
            prop:"daochu",
            label:"导出表格",
            color:"#0099ff"
            // width:100
          },
            {
            prop:"look",
            label:"查看详情",
             color:"#0099ff"
            // width:100
          }
        ],
        tableCon:[
          {
            gongneng:"数据分析",
            TimeDimension: 1518,
            PurDimension:"23%",
            TatalDimension:2329423424,
            BookDimension:300,
            show:false,
            publishTime:"20%",
            classification:1000,
            edition:300,
            pin:100,
            daochu:30,
            look:900


          }
        ]
      },
	    fromTable:{},
      option2:{
          color:echarColor,
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
              left: '3%',
              right: '3%',
              bottom: '10%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  // data : ['查看商品详情', '页面访问', '页面点击', '搜索商品', '加入购物车', '登录', '开始付款','注册-开始注册','付款失败','付款成功'],
                  axisTick: {
                      alignWithLabel: true
                  },
                  axisLabel: {
                      rotate: 50,
                  }
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : []
      },
      option1:{
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
            // {
            //     name: '访问来源',
            //     type: 'line',
            //     radius : '55%',
            //     center: ['50%', '60%'],
            //     data:[
            //         {value:335, name:'直接访问'},
            //         {value:310, name:'邮件营销'},
            //         {value:234, name:'联盟广告'},
            //         {value:135, name:'视频广告'},
            //         {value:1548, name:'搜索引擎'}
            //     ],
            //     itemStyle: {
            //         emphasis: {
            //             shadowBlur: 10,
            //             shadowOffsetX: 0,
            //             shadowColor: 'rgba(0, 0, 0, 0.5)'
            //         }
            //     }
            // }
        ]
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: '最近7天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近14天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近30天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近半年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      option9:{
          color:["#0092ff","#01d195","#ffdf01","#ffa901","#f56c02","#ee3435","#ff6666"],
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              data: []
          },
          grid: {
            top:50,
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
          series : []
      },
      dialogTable:{
        // maxHeight:"200",
        tableHeader:[
          // {
          //   prop:"gongneng",
          //   label:"分辨率",
          //   width:100
          // },
          // {
          //   prop:"TimeDimension",
          //   label:"1280*800",
          //   width:100
          // },
          // {
          //   prop:"PurDimension",
          //   label:"1280*800",
          //   width:100
          // },
          // {
          //   prop:"TatalDimension",
          //   label:"1280*800",
          //   width:100
          // },
          // {
          //   prop:"BookDimension",
          //   label:"1280*800",
          //   width:100
          // },
          // {
          //   prop:"publishTime",
          //   label:"1280*800",
          //   width:100
          // },

          // {
          //   prop:"classification",
          //   label:"1280*800",
          //   width:100
          // },
          //  {
          //   prop:"edition",
          //   label:"1280*800",
          //   width:100
          // },
          //  {
          //   prop:"pin",
          //   label:"1280*800",
          //   width:100
          // },
          // {
          //   prop:"daochu",
          //   label:"1280*800",
          //   width:100
          // },
          //   {
          //   prop:"look",
          //   label:"1280*800",
          //   width:100
          // }
        ],
        tableCon:[
        ]
      },
      tableScreen:{},
      tableDate:false,
      table:{
          tableHeader:[
            // {
            //   prop:"dpi",
            //   label:"分辨率",
            //   align: "left"
            // },
            // {
            //   prop:"number",
            //   label:"使用数量",
            //   align: "left"
            // }
          ],
          tableCon:[]
      },
      mytable:{
          tableHeader:[
            // {
            //   prop:"ip",
            //   label:"IP",
            //   align:"left"
            // },
            // {
            //   prop:"num",
            //   label:"地址",
            //   align:"right"
            // }
          ],
          tableCon:[]
      },
      mianbao:false,
      see:false,
      txt: '',
      showTit:false,
      value4: [((new Date()).getTime() - 3600 * 1000 * 24 * 7),(new Date()).getTime()],
      highHight: false,
      tabletype:{
        type:"",
        area:{},
        project:{},
        module:{}
      },
      backdisabled:true
     }
  },
  components:{
    echar,
    Tb,
    vHead
  },
  created(){
    //第一个筛选框的数据
    this.areaUpdata()
    //请求数据
    this.tabletype.type = 'area'
    this.tabletype.area = this.screen
    this.search(this.screen)
  },
  methods:{
      formChild(data){
          //弹窗的处理
          if(data.dialogVisible){

              if(data.type === "area"){
                let obj = {}
                obj.starttime = this.time.starttime
                obj.endtime = this.time.endtime
                obj.areacode = data.AreaCode
                //分辨率
                if(data.state === "dpi"){
                  this.dialog.title = data.AreaName + '——分辨率明细'
                  this.dpi('http://sc.91onix.com/api/LogSearch/getscreenlist',obj)
                  this.dialog.dialogVisible = data.dialogVisible
                }
                else if(data.state === "userActive"){

                  this.dialog.title = data.AreaName + '——用户活跃量明细'
                  this.userDeatai('http://sc.91onix.com/api/logsearch/getuserlist',obj)
                  this.dialog.dialogVisible = data.dialogVisible

                }
                else if(data.state === "browser"){
                  this.dialog.title = data.AreaName + '——浏览器明细'
                  this.browser('http://sc.91onix.com/api/LogSearch/getbrowserlist',obj)
                  this.dialog.dialogVisible = data.dialogVisible
                }
                else if(data.state === "ip"){

                  this.mydialog.title = data.AreaName + '——IP明细'
                  this.IPdetail('http://sc.91onix.com/api/logsearch/getiplist',obj)
                  this.mydialog.dialogVisible = data.dialogVisible
                }
              }else if(data.type === "project"){

                let obj = {}
                obj.starttime = this.time.starttime
                obj.endtime = this.time.endtime
                obj.projcode = data.ProjectCode
                obj.areacode = data.AreaCode
                if(data.state === "dpi"){

                    this.dialog.title = data.AreaName + '——分辨率明细'
                    this.dpi('http://sc.91onix.com/api/LogSearch/getscreenlist',obj)
                    this.dialog.dialogVisible = data.dialogVisible

                }
                else if(data.state === "browser"){

                  this.dialog.title = data.AreaName + '——浏览器明细'
                  this.browser('http://sc.91onix.com/api/LogSearch/getbrowserlist',obj)
                  this.dialog.dialogVisible = data.dialogVisible
                }
                else if(data.state === "userActive"){
                    this.dialog.title = data.AreaName + '——用户活跃量明细'
                    this.userDeatai('http://sc.91onix.com/api/logsearch/getuserlist',obj)
                    this.dialog.dialogVisible = data.dialogVisible
                }
                else if(data.state === "ip"){
                  this.mydialog.title = data.AreaName + '——IP明细'
                  this.IPdetail('http://sc.91onix.com/api/logsearch/getiplist',obj)
                  this.mydialog.dialogVisible = data.dialogVisible
                }
              }

          }
          //查看详情
          else if(data.type ==="module"){
            this.fromTable = data
            this.highHight = false
            this.module = true
            let obj = {
              starttime:this.time.starttime,
              endtime:this.time.endtime,
              projcode:data.ProjCode,
              modulecode:data.ModuleCode
            }
            this.backdisabled = false
            this.tabletype.type ='detail'
            //第二个参数表示不需要push
            this.details(obj,true)
          }
          //处理置灰
          // else if(data.see){
          //   this.see = true
          //   //tableRe:true 表示切换柱状图时table也重新加载
          //   let selected =  this.$store.state.selected
          //   if(data.moduledata.state){
          //     if(data.moduledata.module === '' || data.moduledata.module === undefined ){
          //       //具体详情
          //       selected[data.moduledata.gongneng] = false

          //     }else{
          //       //显示模块
          //       selected[data.moduledata.module] = false
          //     }

          //     this.$store.commit('selected',selected)
          //   }else{
          //     //添加
          //    if(data.moduledata.module === '' || data.moduledata.module === undefined){
          //       delete selected[data.moduledata.gongneng]

          //    }else{
          //       delete selected[data.moduledata.module]
          //    }

          //   }
          //   this.option2 = {
          //       tooltip: {
          //           trigger: 'axis'
          //       },
          //       color:echarColor,
          //       grid: {
          //           left: '3%',
          //           right: '4%',
          //           bottom: '10%',
          //           containLabel: true
          //       },
          //       legend:{
          //         data: this.$store.state.module.name,
          //         selected: this.$store.state.selected,
          //       },
          //       toolbox: {
          //           feature: {
          //               saveAsImage: {}
          //           }
          //       },
          //       xAxis: {
          //           type: 'category',
          //           boundaryGap: false,
          //           data:this.$store.state.module.time
          //       },
          //       yAxis: {
          //           type: 'value',
          //           name:"访问次数"
          //       },
          //       series:this.$store.state.module.series
          //   }

          // }
          //下一级处理
          else{
            //关闭面包屑出来
            this.mianbao = false
            this.tableDate = true
            this.fromTable = data
            this.tableScreen = {
              AreaCode:data.AreaCode,
              ProjectCode:data.ProjectCode,
              ModuleCode:data.ModuleCode
            }
            this.tabletype.type = data.category
            //把请求项目的参数保存下来
            if(data.category == 'project'){
              this.tabletype.project = this.tableScreen
            }
            //请求模块的参数
            else if(data.category == 'module'){
                this.tabletype.module = this.tableScreen
            }
            this.backdisabled = false
            // 获取所有地区
            this.areaUpdata()
            //获取项目
            let quest  = {
                  "areacode": data.AreaCode
            }
            let requ  = {
                "projcode": data.ProjectCode
            }
            this.moduleUpdata(requ)
            this.projectUpdata(quest)
            //第二个参数表示是表格操作
            this.search(this.tableScreen,true)
          }

      },
        //地区筛选框的下拉的数据
      areaUpdata(){
          this.$ajax.get('http://sc.91onix.com/api/LogSearch/getarea').then(res => {
          this.select.optionsD = res.data
          this.select.optionsD.unshift({ AreaName:"全部"})
          this.select.dataD = this.select.optionsD
        },error =>{
        })
      },
      //项目筛选框的下拉的数据
      projectUpdata(data){

            this.$ajax.get('http://sc.91onix.com/api/LogSearch/getproject' + urlEncode(data,true) ).then(res => {
                this.select.optionsX = res.data
                this.select.optionsX.unshift({ "ProjectName":"全部"})
                this.select.dataX = this.select.optionsX

            },error =>{
            })

      },
      moduleUpdata(data){


        this.$ajax.get('http://sc.91onix.com/api/LogSearch/getmodule' + urlEncode(data,true)).then(res => {

            this.select.optionsM = res.data
            this.select.optionsM.unshift({"ModuleName":"全部"})
            this.select.dataM = this.select.optionsM

            return this.select.dataM
        },error => {
        })

      },
      backButton(type,index){
          this.module = false
          this.breadcrumb.splice(index+1)
          let search = {}
          if(type == "area"){

              console.log("返回则是地区数据")

              search = this.tabletype.area
          }
          else if(type === 'all'){
            let data ={
                AreaCode:'',
                ProjectCode:'',
                ModuleCode:''
            }
            search = data
          }
          else if(type == "project"){
              search = this.tabletype.project
          }
          else if(type == "module"){
            console.log("返回模块部分")
            search = this.tabletype.module
          }
          this.mianbao = true
          this.mianbaodata = search
          this.search(search,true,true)
      },
      promitX(){
            if(this.select.disabledX){
              this.select.proTxtX = true;
              let _this = this;
              setTimeout(function(){
                _this.select.proTxtX = false;
              },3000)
            }
      },
      //查询条件
      searchParent(){
        //面包屑数据关闭
        this.mianbao = false
        this.backdisabled = true
        this.tabletype.area = {}
        this.tabletype.project = {}
        this.tabletype.module = {}
        this.module = false
        this.tableDate = false
        //地区
        if( this.screen.ProjectCode === '' && this.screen.ModuleCode === ''){
            this.tabletype.area = {
              AreaCode:this.screen.AreaCode,
              ProjectCode:this.screen.ProjectCode,
              ModuleCode:this.screen.ModuleCode
            }
            this.tabletype.type = 'Area'
        }
        //项目
        else if((this.screen.AreaCode !== '' &&  this.screen.AreaCode !== '全部') &&  this.screen.ModuleCode === ''){
          this.tabletype.project = {
              AreaCode:this.screen.AreaCode,
              ProjectCode:this.screen.ProjectCode,
              ModuleCode:this.screen.ModuleCode
            }
          this.tabletype.type = 'project'
        }
        //模块
        else if((this.screen.AreaCode !== '' &&  this.screen.AreaCode !== '全部') && (this.screen.ProjectCode !== '' && this.screen.ProjectCode !== '全部')  && this.screen.ModuleCode !== ''){
          this.tabletype.module = {
              AreaCode:this.screen.AreaCode,
              ProjectCode:this.screen.ProjectCode,
              ModuleCode:this.screen.ModuleCode
            }
          this.tabletype.type = 'module'
        }
        this.search(this.screen)
      },
      search(screen,fromtable,noPush){
        //把暂时数据框隐藏
        this.nodata = false
        this.highHight = false

        let data = {}
        this.index.title = []
        if(!fromtable){
            this.breadcrumb = []
        }
        if(this.module){
          this.details(screen)
        }else{
          if((screen.AreaCode === '' || screen.AreaCode === '全部') && screen.ProjectCode === '' && screen.ModuleCode === ''){
          if(!noPush){
            this.breadcrumb.push({name:'全部地区',type:'all'})
          }
          this.line('http://sc.91onix.com/api/logsearch/getareadatedata',this.time,"area")
          this.tableData('http://sc.91onix.com/api/logsearch/getareatabledata',this.time,"area")
          this.rzExport('http://sc.91onix.com/api/logsearch/expareatabledata',this.time)


          }
          if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && screen.ProjectCode === ''&& screen.ModuleCode === ''){
            //某个地区的数据
                let objArea = this.select.dataD.find( item =>{
                  return item.AreaCode  === screen.AreaCode
                })
                if(!noPush){
                      this.breadcrumb.push({name:objArea.AreaName + '地区数据',type:'area'})
                }
                data.starttime = this.time.starttime
                data.endtime = this.time.endtime
                data.areacode = screen.AreaCode
                this.line('http://sc.91onix.com/api/logsearch/getareadatedata',data)
                this.tableData('http://sc.91onix.com/api/logsearch/getareatabledata',data,"area")
                this.rzExport('http://sc.91onix.com/api/logsearch/expareatabledata',data)
          }

          if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && screen.ProjectCode === '全部' && screen.ModuleCode === ''){
            //某个地区下的全部项目
            let objArea = this.select.dataD.find( item =>{
                  return item.AreaCode  === screen.AreaCode
            })
            if(!noPush){
              this.breadcrumb.push({name:objArea.AreaName + '地区项目',type:'project'})
            }
            data.starttime = this.time.starttime
            data.endtime = this.time.endtime
            data.areacode = screen.AreaCode
            this.line('http://sc.91onix.com/api/logsearch/getprojdatedata',data)
            this.tableData('http://sc.91onix.com/api/logsearch/getprojtabledata',data,"project")
            this.rzExport(' http://sc.91onix.com/api/logsearch/expprojtabledata',data)

          }
          if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && (screen.ProjectCode !== '全部' && screen.ProjectCode !== '') && screen.ModuleCode === ''){
            //某个地区下的某个项目
            let objArea = this.select.dataD.find( item =>{
                  return item.AreaCode  === screen.AreaCode
            })
            let objProject = this.select.dataX.find( item =>{
                  return item.ProjectCode  === screen.ProjectCode
            })
            if(!noPush){
              this.breadcrumb.push({name:objProject.ProjectName + '项目',type:'project'})
            }
            data.starttime = this.time.starttime
            data.endtime = this.time.endtime
            data.areacode = screen.AreaCode
            data.projcode = screen.ProjectCode
            this.line('http://sc.91onix.com/api/logsearch/getprojdatedata',data)
            this.tableData('http://sc.91onix.com/api/logsearch/getprojtabledata',data,"project")
            this.rzExport(' http://sc.91onix.com/api/logsearch/expprojtabledata',data)
          }
          if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && (screen.ProjectCode !== '全部' && screen.ProjectCode !== '') && screen.ModuleCode === '全部'){
            //某个项目下的全部模
            let objArea = this.select.dataD.find( item =>{
                  return item.AreaCode  === screen.AreaCode
            })
            let objProject = this.select.dataX.find( item =>{
                  return item.ProjectCode  === screen.ProjectCode
            })
            if(!noPush){
                this.breadcrumb.push({name:objProject.ProjectName + '项目模块',type:'module'})
            }
            data.starttime = this.time.starttime
            data.endtime = this.time.endtime
            data.projcode = screen.ProjectCode
            this.line('http://sc.91onix.com/api/logsearch/getmoduledatedata',data,true)
            this.tableData('http://sc.91onix.com/api/logsearch/getmoduletabledata',data,"module")
            this.rzExport(' http://sc.91onix.com/api/logsearch/expmoduletabledata',data)
          }
          if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && (screen.ProjectCode !== '全部' && screen.ProjectCode !== '') && (screen.ModuleCode !== '' && screen.ModuleCode !== '全部') ){
            //某个地区下的某个模块
            let objArea = this.select.dataD.find( item =>{
                  return item.AreaCode  === screen.AreaCode
            })

            let objProject = this.select.dataX.find( item =>{
                  return item.ProjectCode  === screen.ProjectCode
            })
            let objModule = this.select.dataM.find( item =>{
                  return item.ModuleCode  === screen.ModuleCode
            })
            if(!noPush){
                this.breadcrumb.push({name:objModule.ModuleName + '模块',type:'module'})
            }
            data.starttime = this.time.starttime
            data.endtime = this.time.endtime
            data.projcode = screen.ProjectCode
            data.modulecode = screen.ModuleCode
            this.line('http://sc.91onix.com/api/logsearch/getmoduledatedata',data,true)
            this.tableData(' http://sc.91onix.com/api/logsearch/getmoduletabledata',data,"module")
            this.rzExport(' http://sc.91onix.com/api/logsearch/expmoduletabledata',data)
          }

        }
      },
      promitM(){
        if(this.select.disabledM){
          this.select.proTxtM = true;
          let _this = this;
          setTimeout(function(){
            _this.select.proTxtM = false;
          },3000)
        }
      },
      changeD(value){
        this.screen.ProjectCode = ""
        this.screen.ModuleCode = ""
        this.backdisabled = true
        if(value !== "全部" && value !== ""){
              let obj = {};
              obj = this.select.dataD.find(item => item.AreaName === value);
              let data  = {
                  "areacode":obj.AreaCode
              }
              this.screen.AreaCode = obj.AreaCode

              this.projectUpdata(data)

            this.select.disabledX = false;
            this.select.proTxtX = false;
            this.select.optionalX = true;

        }else{
          if(this.screen.AreaCode = "全部"){
              this.screen.ProjectCode = ""
              this.screen.ModuleCode = ""
          }
          this.select.dataX = []
          this.select.valueX = ''
          this.select.optionsX = true
          this.select.disabledX = true
          this.select.optionalX = true;
        }
      },
      changeX(value){

        this.screen.ModuleCode = ""
        this.backdisabled = true
        if(value !== "全部" && value !== ""){
            let obj = {};
            obj = this.select.dataX.find(item => item.ProjectName === value);
              let data  = {
                "projcode":obj.ProjectCode
            }
            this.screen.ProjectCode = obj.ProjectCode
            this.moduleUpdata(data)
          this.select.disabledM = false;
          this.select.proTxtM = false;
          this.select.optionalX = false;
        }else{
            if( this.screen.AreaCode == "全部"  || value == ""){
                this.screen.ProjectCode = ""
            }else{
                this.screen.ProjectCode = "全部"
            }
            this.screen.ModuleCode = ""
            this.select.dataM = []
            this.select.valueM = ''
            this.select.optionsM = []
            this.select.disabledM = true;
        }

      },
      changeM(value){
        this.screen.ModuleCode = ""
        this.backdisabled = true
        if(value !== "全部" && value !== ""){
          let obj = {};
          obj = this.select.dataM.find(item => item.ModuleName === value);
          this.screen.ModuleCode = obj.ModuleCode
          this.select.optionalM = false;
        }else{
          if( this.screen.ProjectCode === "全部" || value == ""){
            this.screen.ModuleCode = ""
          }else{
            this.screen.ModuleCode = "全部"
          }
           console.log(this.screen)

          this.select.optionalM = true;
        }

      },
      showPop(){
        let valueNode = event.target.parentNode.getElementsByClassName('valueBox')[0];
        let iconNode = event.target.parentNode.getElementsByClassName('icon')[0];

        let valLen = valueNode.innerHTML.length;
        if(valLen > 5){
          this.showTit = true;
          this.txt = valueNode.innerHTML;

          let titlePop = document.getElementsByClassName('titlePop')[0];
          // 设置为当前下拉箭头的绝对定位
          titlePop.style.left = (this.getElementLeft(iconNode) - 20) + 'px';
          titlePop.style.top = (this.getElementTop(iconNode) + 40) + 'px';
        }
      },
      hidePop(){
        this.showTit = false;
      },
      visibleChange(){
        // 点击input,获取.el-select的自定义属性data-num,从而得知对应下拉icon索引值
        if(event.target.tagName == "INPUT"){
          this.num = event.target.parentNode.parentNode.getAttribute('data-num');
        }

        let activeIcon = this.$refs.select_main.getElementsByClassName('icon')[this.num];
        // 根据mouseEvent和focusEvent中bubbles的属性值判断下拉是否出现，进而处理下拉icon的状态
        if(event.bubbles){
          activeIcon.setAttribute('class','icon iconfont icon-xiala rotatingT');

        }else{
          activeIcon.setAttribute('class','icon iconfont icon-xiala rotating');

        }
      },
      getElementLeft(element){
        // 获取元素的绝对定位left
  　　　var actualLeft = element.offsetLeft;
  　　　var current = element.offsetParent;
  　　　while(current !== null){
  　　　　　　actualLeft += current.offsetLeft;
  　　　　　　current = current.offsetParent;
  　　　　}
  　　　　return actualLeft;
      },
    dataTime(data){
      let time = data.split(" ")
      this.time.starttime = time[0]
      this.time.endtime = time[2]
      let scree = {}
      if(this.tableDate){
        if(this.module){
            scree.starttime = this.time.starttime
            scree.endtime = this.time.endtime
            scree.modulecode = this.fromTable.ModuleCode
            scree.projcode = this.fromTable.ProjCode
        }else{

            scree =  this.tableScreen
        }
      }else{
          scree = this.screen
      }
      this.search(scree)
    },
    getElementTop(element){
      // 获取元素的绝对定位top
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualTop;
　　},
  barShow(){
    this.highHight = true;
    this.bar = true
    let screen = {}
    //点击面包屑的数据
    if(this.mianbao){
      screen = this.mianbaodata
    }else{
      screen = this.tableDate?this.tableScreen:this.screen
    }

    if(this.tableRe){
      let data = this.$store.state.table
      this.tableMudole?this.tablemodule(data,'bar'):this.tabledetail(data,'bar')
    }
    let data = {}
    //module：true 表示是具体详情模块
    if(this.module){
      let obj = {}
        obj.starttime = this.time.starttime
        obj.endtime = this.time.endtime
        obj.modulecode = this.fromTable.ModuleCode
        obj.projcode = this.fromTable.ProjCode
        this.echars('http://sc.91onix.com/api/LogSearch/getfuncbardata',obj)

    }else{
      if((screen.AreaCode === '' || screen.AreaCode === '全部') && screen.ProjectCode === '' && screen.ModuleCode === ''){
        //全部地区的数据
        this.echars('http://sc.91onix.com/api/logsearch/getareabardata',this.time)


      }
      if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && screen.ProjectCode === ''&& screen.ModuleCode === ''){
        //某个地区的数据
          data.starttime = this.time.starttime
          data.endtime = this.time.endtime
          data.areacode = screen.AreaCode
          this.echars('http://sc.91onix.com/api/logsearch/getareabardata',data)
      }

      if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && screen.ProjectCode === '全部' && screen.ModuleCode === ''){
        //某个地区下的全部项目
        data.starttime = this.time.starttime
        data.endtime = this.time.endtime
        data.areacode = screen.AreaCode
        this.echars('http://sc.91onix.com/api/logsearch/getprojbardata',data)

      }
      if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && (screen.ProjectCode !== '全部' && screen.ProjectCode !== '') && screen.ModuleCode === ''){
        //某个地区下的某个项目
        data.starttime = this.time.starttime
        data.endtime = this.time.endtime
        data.areacode = screen.AreaCode
        data.projcode = screen.ProjectCode
        this.echars('http://sc.91onix.com/api/logsearch/getprojbardata',data)
      }
      if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && (screen.ProjectCode !== '全部' && screen.ProjectCode !== '') && screen.ModuleCode === '全部'){
        //某个项目下的全部模块
        data.starttime = this.time.starttime
        data.endtime = this.time.endtime
        data.projcode = screen.ProjectCode
        this.echars('http://sc.91onix.com/api/logsearch/getmodulebardata',data,true)
      }
      if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && (screen.ProjectCode !== '全部' && screen.ProjectCode !== '') && (screen.ModuleCode !== '' && screen.ModuleCode !== '全部') ){
        //某个地区下的某个模块
        data.starttime = this.time.starttime
        data.endtime = this.time.endtime
        data.projcode = screen.ProjectCode
        data.modulecode = screen.ModuleCode
        this.echars('http://sc.91onix.com/api/logsearch/getmodulebardata',data)
      }
    }
  },
 arr_to_json(arr){
   let temp = {}
   for(let key in arr){
     if(arr[key] instanceof Array){
       temp[key] = foreach(arr[key])
     }else{
       temp[key] = arr[key]
     }
   }
   return temp
 },
  lineShow(){
      this.highHight = false;
      this.bar = false
      let screen = this.tableDate?this.tableScreen:this.screen
      let data = {}
      if(this.tableRe){
            let data = this.$store.state.table
            //tableMudole:true 表示渲染模块表格
            this.tableMudole?this.tablemodule(data,'line'):this.tabledetail(data,'line')
      }
       //module：true 表示是具体详情模块
      if(this.module){
        let obj = {}
          obj.starttime = this.time.starttime
          obj.endtime = this.time.endtime
          obj.modulecode = this.fromTable.ModuleCode
          obj.projcode = this.fromTable.ProjCode
         this.line('http://sc.91onix.com/api/LogSearch/getfuncdatedata',obj)

      }else{
        if((screen.AreaCode === '' || screen.AreaCode === '全部') && screen.ProjectCode === '' && screen.ModuleCode === ''){
          //全部地区的数据
          this.line('http://sc.91onix.com/api/logsearch/getareadatedata',this.time)


        }
        if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && screen.ProjectCode === ''&& screen.ModuleCode === ''){
          //某个地区的数据

              data.starttime = this.time.starttime
              data.endtime = this.time.endtime
              data.areacode = screen.AreaCode
              this.line('http://sc.91onix.com/api/logsearch/getareadatedata',data)
        }
        if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && screen.ProjectCode === '全部' && screen.ModuleCode === ''){
          //某个地区下的全部项目
          data.starttime = this.time.starttime
          data.endtime = this.time.endtime
          data.areacode = screen.AreaCode
          this.line('http://sc.91onix.com/api/logsearch/getprojdatedata',data)

        }
        if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && (screen.ProjectCode !== '全部' && screen.ProjectCode !== '') && screen.ModuleCode === ''){
          //某个地区下的某个项目
          data.starttime = this.time.starttime
          data.endtime = this.time.endtime
          data.areacode = screen.AreaCode
          data.projcode = screen.ProjectCode
          this.line('http://sc.91onix.com/api/logsearch/getprojdatedata',data)
        }
        if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && (screen.ProjectCode !== '全部' && screen.ProjectCode !== '') && screen.ModuleCode === '全部'){
          //某个项目下的全部模块
          data.starttime = this.time.starttime
          data.endtime = this.time.endtime
          data.projcode = screen.ProjectCode
          this.line('http://sc.91onix.com/api/logsearch/getmoduledatedata',data,true)
        }
        if((screen.AreaCode !== '' && screen.AreaCode !== '全部') && (screen.ProjectCode !== '全部' && screen.ProjectCode !== '') && (screen.ModuleCode !== '' && screen.ModuleCode !== '全部') ){
          //某个地区下的某个模块
          data.starttime = this.time.starttime
          data.endtime = this.time.endtime
          data.projcode = screen.ProjectCode
          data.modulecode = screen.ModuleCode
          this.line('http://sc.91onix.com/api/logsearch/getmoduledatedata',data)
        }
      }

  },
  line(url,data,save){
      //折线图
      this.$ajax.get(url + urlEncode(data,true)).then( res=>{
            if(res.status === 200){
                // this.loading = false
                let data = res.data
                let obj = {}
                let series = []
                let time = []
				        let selected = {}
                let name =[]
                for(let i = 0;i < data.length ; i++){
                    let sum = []
                    time = []
                    for(let j = 0;j < data[i].Data.length;j++){
                          time.push(data[i].Data[j].Date)
                          sum.push(data[i].Data[j].CNT)
                    }
                    this.linetime = time
                    obj = {
                        name:data[i].Name,
                        type:'line',
                        stack: '总量',
                        smooth:true,
                        data:sum,
                        itemStyle : { normal: {label : {show: true}}}
                    }
                    series.push(obj)
                    name.push(data[i].Name)
                    //设置灰色
                    if(save){
                      if(i > 4){
                          selected[name[i]]= false
                      }
                    }

                }
                if(series.length < 1){
                  this.nodata = true
                }else{

                  this.option2 = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    color:echarColor,
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '10%',
                        containLabel: true
                    },
                    legend:{
                      data:name,
                      selected:selected,
                    },
                    toolbox: {
                      right: '20px',
                      top: '10px',
                      feature: {
                          saveAsImage: {}
                      }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:time
                    },
                    yAxis: {
                        type: 'value',
                        name:"访问次数"
                    },
                    series:series
                  }
                }

            }

      },error=>{
      })
  },
    //柱状图
  echars(url,data,save){
        //echarse图的数据地区的
        this.$ajax.get(url + urlEncode(data,true)).then(res => {

            if(res.status === 200){
                  // this.loading = false
                  let data = res.data
                  let xAxis = []
                  let yAxis = []
                  for(let i = 0;i < data.length; i++){
                      xAxis.push(data[i].Name)
                      yAxis.push(data[i].CNT)
                  }
                  if(save){
                    this.$store.commit('bar',{
                      xAxis:xAxis,
                      yAxis:yAxis
                    })
                  }

                  this.option2 = {
                    color:echarColor,
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                      right: '20px',
                      top: '10px',
                      feature: {
                          saveAsImage: {}
                      }
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '10%',
                        containLabel: true
                    },
                    legend:{
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data :xAxis,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                rotate: 30,
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name:"直接访问量"
                        }
                    ],
                    series : [
                        {
                          name:'直接访问',
                          type:'bar',
                          barWidth: '50px',
                          data:yAxis,
                          itemStyle: {
                            normal:{
                              color: function (params){
                                  var colorList = echarColor;
                                  return colorList[params.dataIndex];
                              },
                              label : {
                                    show: true,
                                    position: 'top'
                                }
                            }
                          }
                        }
                    ]
                  }
            }


        },error =>{
        })
  },
  tableData(url,data,type){
      this.$ajax.get(url + urlEncode(data,true)).then(res=>{
        if(res.status === 200){
          //  this.loading = false
          let data = res.data

          // 地区管表格
          if(type === "area"|| type === "project"){
             this.tableRe = false

              let obj = {}
              let table = {
                // 地区和项目
                tableHeader:[
                  {
                    prop:"date",
                    type:"index",
                    label:"序号",
                    align:"center",
                    width:100
                  },
                  {
                    prop:"address",
                    label:"地区",
                    address:true,
                    align:"center"
                    // width:100
                  },
                  {
                    prop:"num",
                    label:"访问次数",
                    align:"center"
                    // width:100
                  },
                  {
                    prop:"userActive",
                    label:"用户活跃量",
                    align:"center",
                    userActive:true
                    // width:100
                  },
                  {
                    prop:"ip",
                    label:"IP数",
                    align:"center",
                    ip:true
                    // width:100
                  },
                  {
                    prop:"time",
                    label:"访问总时长",
                    align:"center"
                    // width:100
                  },

                  {
                    prop:"average",
                    label:"平均访问时长",
                    align:"center"
                    // width:100
                  },
                  {
                    prop:"browser ",
                    label:"浏览器",
                    align: "left",
                    align:"center",
                    browser:true
                    // width:100
                  },
                  {
                    prop:"power",
                    label:"分辨率",
                    align:"center",
                    power:true
                    // width:100
                  }
                ],
                tableCon:[]
              }
              for(let i=0 ; i< data.length;i++ ){
                  obj = {
                      address:data[i].Name,
                      color:echarColor[i],
                      num: data[i].CNT,
                      userActive:data[i].Users,
                      ip:data[i].IP,
                      time:"---",
                      usershow:false,
                      ipshow:false,
                      AreaCode:data[i].AreaCode,
                      ProjCode:data[i].ProjCode,
                      type:type === "area" ? "area":"project",
                      timePecent:"---",
                      average:"-----",
                  }
                  table.tableCon.push(obj)
              }
              this.table = table
          }
          //模块显示
          else if(type === "module"){
             this.tableRe = true
             this.tableMudole = true
             this.$store.commit('table',data)
             this.tablemodule(data,'line')
           }
          //具体模块渲染
          else if(this.module){
            //用来判断重新渲染页面的
            this.tableRe = true
            //用来判断显示哪一个类型的表格
            this.tableMudole = false
            this.$store.commit('table',data)
            this.tabledetail(data,'line')
            }
          }
      },error => {
        //请求不成功
      })
  },
  /**
    模块表格渲染
   */
  tablemodule(data,type){
      let obj = {}

      let table = {
          //概览模块
          tableHeader:[
            {
              prop:"date",
              type:"index",
              label:"序号",
              align:"center",
              width:100
            },
            {
              prop:"see",
              label:"显示",
              align:"center",
              see:true,
              color:null
              // width:100
            },
            {
              prop:"module",
              label:"模块",
              align:"center",
              // width:100
            },
            {
              prop:"num",
              label:"访问次数",
              align:"center"
              // width:100
            },
            {
              prop:"pecent",
              label:"访问次数比",
              align:"center"

              // width:100
            },
            {
              prop:"fangwenip",
              label:"IP数",
              align:"center"
              // width:100
            },
            {
              prop:"time",
              label:"访问总时长",
              align:"center"
              // width:100
            },
            {
              prop:"timePecent",
              label:"访问时长占比",
              align:"center"
              // width:100
            },
            {
              prop:"average",
              label:"平均访问时长",
              align:"center"
              // width:100
            },
            {
              prop:"see",
              look:true,
              label:"查看详情",
              align:"center",
            }
          ],
          tableCon:[]
        }
        // console.log(table)
      let sum = 0
      for(let i = 0 ; i< data.length ;i++){
         sum += parseInt(data[i].CNT)
      }
      for(let i = 0 ; i < data.length;i++){
        let obj
        obj = {
              module: data[i].Name,
              num: data[i].CNT,
              pecent:this.GetPercent(parseInt(data[i].CNT),sum),
              fangwenip:data[i].IP,
              time:"----",
              ModuleCode:data[i].ModuleCode,
              ProjCode:data[i].ProjCode,
              color:echarColor[i],
              timePecent:"----",
              average:"-----",
              index:i,
              state:i < 5 ? true:false
        }
        table.tableCon.push(obj)
      }

      this.table = table
  },
  /**
  具体详情表格渲染
   */
  tabledetail(data,type){
      let  table3 =  {
        tableHeader:[
          {
              prop:"date",
              type:"index",
              label:"序号",
              align:"center",
              width:100
          },
          {
                prop:"see",
                label:"显示",
                see:true
                // width:100
          },
          {
            prop:"gongneng",
            label:"功能",
            align:"center"
            // width:100
          },
          {
            prop:"value",
            label:"访问次数",
            align:"center"
          }
        ],
        tableCon:[
        ]
      }
      for(let i = 0 ; i < data.length;i++){
        let obj

        obj  = {
          gongneng:data[i].Name,
          value: data[i].CNT,
          color: echarColor[i]
        }
        table3.tableCon.push(obj)
      }
      this.table = table3
  },
  /**
  计算百分比
  */
  GetPercent(num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
      return "-";
      }
      return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00 + "%");
  },
    //分辨率弹窗
  dpi(url,data){
      this.$ajax.get(url +  urlEncode(data,true) ).then(res => {
          if(res.status === 200){
            let data = res.data
            this.echarShow = true

              let prop = ["TimeDimension","PurDimension","TatalDimension","BookDimension","publishTime","classification","edition","pin","daochu"]
              let table = {
                // maxHeight:"210",
                tableHeader:[
                  {
                    prop:"gongneng",
                    label:"分辨率",
                    align:"center"
                  },
                  {
                    prop:"num",
                    label:"访问次数",
                    align:"center"
                  },
                  {
                    prop:"proportion",
                    label:"占比",
                    align:"center"
                  }
                ],
                tableCon:[]
            }
            let option = {
                color:["#0092ff","#01d195","#ffdf01","#ffa901","#f56c02","#ee3435","#ff6666"],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    data: []
                },
                grid: {
                  top:50,
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
                      center: ['50%', '50%'],
                      data:[
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
            }

        let sum  = 0
        for(let i = 0; i <data.length ; i++){
            sum += parseInt(data[i].CNT)
        }
        for(let i = 0;i < data.length; i++ ){
          let obj = {
              gongneng: data[i].Screen,
              num: data[i].CNT,
              proportion:this.GetPercent(parseInt(data[i].CNT),sum)
          }
          table.tableCon.push(obj)
          let echr = {
              value:data[i].CNT,
              name:data[i].Screen
          }
          option.legend.data.push(data[i].Screen)
          option.series[0].data.push(echr)
        }
        this.dialogTable = table
        this.option9 = option


          }
        },error =>{

      })
  },
    //浏览器弹窗
  browser(url,data){
        this.$ajax.get(url +  urlEncode(data,true) ).then(res => {
              if(res.status === 200){
                this.echarShow = true
                let data = res.data
                let prop = ["TimeDimension","PurDimension","TatalDimension","BookDimension","publishTime","classification","edition","pin","daochu"]
                let table = {
                // maxHeight:"210",
                tableHeader:[
                  {
                    prop:"gongneng",
                    label:"浏览器",
                    align:"center"
                  },
                  {
                    prop:"num",
                    label:"访问次数",
                    align:"center"
                  },
                  {
                    prop:"proportion",
                    label:"占比",
                    align:"center"
                  }
                ],
                tableCon:[]
               }

                let option = {
                  color:["#0092ff","#01d195","#ffdf01","#ffa901","#f56c02","#ee3435","#ff6666"],
                  tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  legend: {
                    data: []
                  },
                  grid: {
                    top:50,
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
                    center: ['50%', '50%'],
                    data:[
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
                }
                let sum  = 0
                for(let i = 0; i <data.length ; i++){
                    sum += parseInt(data[i].CNT)
                }
                for(let i = 0;i < data.length; i++ ){
                  let obj = {
                      gongneng: data[i].Browser,
                      num: data[i].CNT,
                      proportion:this.GetPercent(parseInt(data[i].CNT),sum)
                  }
                  table.tableCon.push(obj)
                  let echr = {
                      value:data[i].CNT,
                      name:data[i].Browser
                  }
                  option.legend.data.push(data[i].Browser)
                  option.series[0].data.push(echr)
                }
                this.dialogTable = table
                this.option9 = option


              }
            },error =>{

        })
  },
  userDeatai(url,data){
    this.$ajax.get(url + urlEncode(data,true)).then( res=>{

      if(res.status == 200){
        this.echarShow = true
        let data = res.data
        let table = {
          // maxHeight:"200",
        //概览模块
          tableHeader:[
            {
              prop:"user",
              label:"用户",
              align:"center"
            },
            {
              prop:"num",
              label:"访问次数",
              align:"center"
            },
            {
              prop:"proportion",
              label:"占比",
              align:"center"
            }
          ],
          tableCon:[]
        }
        let option = {
          color:["#0092ff","#01d195","#ffdf01","#ffa901","#f56c02","#ee3435","#ff6666"],
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            data: []
          },
          grid: {
            top:50,
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
            name: '访问次数',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
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
        }

        //获取总的访问量
        let sum  = 0
        for(let i = 0; i <data.length ; i++){
            sum += parseInt(data[i].CNT)
        }
        for(let i = 0;i < data.length; i++ ){
          let obj = {
              user: data[i].UserName,
              num: data[i].CNT,
              proportion:this.GetPercent(parseInt(data[i].CNT),sum)
          }
          table.tableCon.push(obj)
          let echr = {
              value:data[i].CNT,
              name:data[i].UserName
          }
          option.legend.data.push(data[i].UserName)
          option.series[0].data.push(echr)
        }
        this.dialogTable = table
        this.option9 = option

      }

    },error =>{

    })

  },
  rzExport(url,data){
    this.$ajax.get(url +urlEncode(data,true) ).then(res=>{
      this.download = res.data.url
    })

  },
    //具体模块
  details(data){
      let ModuleObj = this.select.dataM.find( item =>{
           return  item.ModuleCode === data.modulecode
      })
      // if(!nopush){
          this.breadcrumb.push({name:ModuleObj.ModuleName + "模块详情",type:'detail'})
      // }
      //折线图
      this.line('http://sc.91onix.com/api/LogSearch/getfuncdatedata',data,true)
      //表格
      this.tableData('http://sc.91onix.com/api/LogSearch/getfunctabledata',data)
      this.rzExport('http://sc.91onix.com/api/logsearch/expfunctabledata',data)
  },
  IPdetail(url,data){
     this.echarShow = false
     this.$ajax.get(url + urlEncode(data,true)).then(res =>{
          if(res.status === 200){
            this.echarShow = false
            let data = res.data
            let table = {
              // maxHeight:"210",
              tableHeader:[
                {
                  prop:"ip",
                  label:"IP",
                  align:"center"
                },
                {
                  prop:"num",
                  label:"地址",
                  align:"center"
                }
              ],
              tableCon:[]
            }
            for(let i = 0;i < data.length; i++ ){
              let obj = {
                  ip: data[i].IP,
                  num: data[i].Adress
              }
              table.tableCon.push(obj)
            }
           this.mytable = table
          }
     },error=>{

     })
  }


}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
@import "../common/css/mixin/_var.scss";

.index {
  background: #ecedf0;
  .moren{
    color:#ccc !important
  }

  .el-dialog {
         border-top-left-radius: 15px;
         border-top-right-radius: 15px;

    -moz-border-top-left-radius: 15px;
    -moz-border-top-right-radius: 15px;

    .el-dialog__header {
      height: 50px;
      text-align: left;
      padding-top: 14px;
      font-size: 18px;
      background: $bgc_24a;

      .el-dialog__title,
      .el-dialog__close {
        color: #fff;
      }

      .el-dialog__close:hover {
        color: #000;
      }
    }

    .myDialog {
      width: 100%;
      height: 300px;

      #echars {
        width: 100%;
        height: 100%;
      }
    }

    .myDialogtable {
      width: 97%;

      // min-width:400px;
      .pop {
        width: 100%;
        height: 45px;
             border-top-left-radius: 10px;
             border-top-right-radius: 10px;
        background: #24a5e0;

        -moz-border-top-left-radius: 10px;
        -moz-border-top-right-radius: 10px;
      }

      .mytable {
        width: 100%;
        height: 250px;
        overflow-x: hidden;

        .el-table {
          width: 100%;

          .el-table__header-wrapper {
            thead {
              // th{
              //     background-color: #03A9F4;
              //     border-bottom: 1px solid #03A9F4;
              //     .cell{
              //           background-color: #03A9F4;
              //     }
              // }
            }
          }

          tr {
            text-align: center;
          }
        }
      }
    }
  }

  .select {
    width: 100%;
    height: 60px;
    margin: 30px 0 0 0;

    .select_main {
      width: 97%;
      height: 100%;
      margin: 0 auto;

      .selIn {
        position: relative;
        float: left;
        width: 260px;
        height: 100%;
        border-radius: 4px;
        margin-right: 5%;
        background-color: #fff;

        .tit {
          position: absolute;
          z-index: 0;
          top: 0;
          left: 10px;
          line-height: 60px;
          font-size: 18px;
          color: #333;
        };

        .yin {
          position: absolute;
          left: 61px;
          height: 60px;
          line-height: 60px;
          font-size: 18px;

          i {
            position: absolute;
            top: 3px;
            right: -20px;
            display: inline-block;
            -webkit-transform-origin: center;
                    transform-origin: center;
          }

          span {
            display: inline-block;
            max-width: 110px;
            font-size: 18px;
            color: #666;
            overflow: hidden;
            white-space: nowrap;

            text-overflow: ellipsis;
          }
        }

        .yinRe {
          left: 46px;
        }

        .proTxtX,
        .proTxtM {
          position: absolute;
          top: 63px;
          left: 13px;
          font-size: 12px;
          color: #ff534e;
        }

        .el-input__inner {
          opacity: 0;
          padding-left: 60px;
          background: transparent;
        }

        &:nth-child(1) {
          .el-select {
            &:after {
              background: url("../common/img/adress.png") no-repeat center;
              background-size: 30px 30px;
            }
          }
        }

        &:nth-child(2) {
          .el-select {
            &:after {
              background: url("../common/img/gaisu.png") no-repeat center;
              background-size: 30px 30px;
            }
          }
        }

        &:nth-child(3) {
          .el-select {
            &:after {
              background: url("../common/img/mokuai.png") no-repeat center;
              background-size: 30px 30px;
            }
          }
        }
      }

      .el-select {
        position: relative;
        float: left;
        width: 260px;
        height: 60px;
        box-shadow: 0 0 8px 1px #ccc;

        &:after {
          position: absolute;
          top: 9px;
          right: 16px;
          display: block;
          width: 40px;
          height: 40px;
          // background: url("../common/img/gaisu.png");

          content: "";
        }

        .el-input {
          height: 100%;

          .el-input__icon + .el-input__inner {
            height: 100%;
            border-radius: 0;
          }

          .el-icon-caret-top {
            display: none;
          }
        }
      }

      .el-button {
        float: left;
        width: 90px;
        height: 40px;
        margin-top: 13px;
      }
    }
  }

  .echar {
    width: 100%;
    height: 500px;
    margin: 60px 0 0 0;

    .main_echar {
      position: relative;
      width: 97%;
      height: 100%;
      margin: 0 auto;
      background: #fff;

      .nodata {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 88px;
        height: 30px;
        margin: auto;
        color: #24a5e0;
      }

      #echars {
        width: 100%;
        height: 100%;
        background: #fff;
      }

      .line,
      .bar {
        position: absolute;
        z-index: 1000;
        top: 10px;
        width: 40px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        border-radius: 2px;
        color: #fff;
        background-color: rgba(#24a5e0,.2);

        cursor: pointer;

        &:hover {
          background-color: #24a5e0;
        }
      }

      .active {
        background-color: #24a5e0;
      }

      .bar {
        right: 65px;
        font-size: 20px;
      }

      .line {
        right: 108px;
      }
    }

    .time {
      width: 97%;
      height: 50px;
           border-top-left-radius: 8px;
           border-top-right-radius: 8px;
      margin: 0 auto;
      background: #24a5e0;

      -moz-border-top-left-radius: 8px;
      -moz-border-top-right-radius: 8px;
    }

    .echars {
      width: 97%;
      height: 560px;
      margin: 0 auto;
      background: #fff;

      #echars {
        width: 100%;
        height: 100%;

        padding-button: 20px;
      }
    }
  }

  .table {
    width: 100%;
    margin: 60px 0 0 0;
    padding-bottom: 50px;

    .export {
      width: 97%;
      height: 50px;
           border-top-left-radius: 8px;
           border-top-right-radius: 8px;
      margin: 0 auto;
      background: #24a5e0;

      -moz-border-top-left-radius: 8px;
      -moz-border-top-right-radius: 8px;

      .el-button {
        float: right;
        margin: 8px 1% 0 0;
      }

      .backButton {
        float: left;
        margin: 8px 0 0 2%;
      }

      .el-button--text {
        color: #fff;

        &:hover {
          color: #bec6cc;
        }
      }

      .icon-fanhui1:before {
        font-size: 22px;
      }

      a {
        color: #1f2d3d;

        &:hover {
          color: #24a5e0;
        }
      }

      .breadcrumb {
          width: 50%;
          line-height: 45px;
          font-size: 17px;
          float: left;
          margin-left: 10px;
          margin-top: 3px;
          .el-button{
            float:left;
          }

        // .el-breadcrumb__item {
        //   float: none;
        //   span{
        //     color: #bde1f1;
        //     &:hover{
        //       color:#fff;
        //     }
        //   }
        //   &:last-child .el-breadcrumb__item__inner,
        //   .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a,
        //   .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a:hover,
        //   .el-breadcrumb__item:last-child .el-breadcrumb__item__inner:hover{
        //     color:#fff
        //   }
        // }

        // span {
        //   // color: #fff;

        //   cursor: pointer;
        // }
      }

      .title {
        height: 100%;
        text-align: center;
        line-height: 50px;
        font-size: 22px;
        color: #fff;
      }
    }

    .main_table {
      width: 97%;
      margin: 0 auto;

      .icon-browser:hover:before,
      .icon-fenbianshuai:hover:before,
      .icon-See:hover:before {
        color: #24a5e0;
      }
    }
  }

  // add by syy
  .el-date-editor--daterange.el-input {
    float: left;
    margin: 7px 0 7px 1%;
  }

  .titlePop {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);

    .popArrow {
      position: absolute;
      top: -8px;
      left: 20px;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top-width: 0;
      border-bottom-color: #ccc;

      &:after {
        position: absolute;
        top: 1px;
        display: block;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        border-color: transparent;
        border-top-width: 0;
        border-bottom-color: #fff;
        margin-left: -6px;

        content: " ";
      }
    }
  }
}

.el-picker-panel__shortcut {
  line-height: 38px;
}

.rotating {
  -webkit-animation: rotating linear .2s;
          animation: rotating linear .2s;

  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
}

@-webkit-keyframes rotating {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
  }
}

@keyframes rotating {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
  }
}

.rotatingT {
  -webkit-animation: rotatingT linear .2s;
          animation: rotatingT linear .2s;

  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
}

@-webkit-keyframes rotatingT {
  0% {
    -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
  }

  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}

@keyframes rotatingT {
  0% {
    -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
  }

  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}

@media screen  and (max-height:930px) {
  .index {
    .select {
      height: 50px;
      margin: 15px 0 0 0;

      .select_main {
        .selIn {
          .tit {
            height: 50px;
            line-height: 50px;
          }

          .yin {
            height: 50px;
            line-height: 50px;
          }

          .el-select {
            height: 50px;

            &:after {
              background-size: 30px 30px;
            }
          }
        }

        .el-select:after {
          background-size: 30px 30px;
        }
      }
    }

    .el-dialog {
      .myDialog {
        height: 200px;
      }

      .myDialogtable {
        .pop {
          height: 30px;
        }

        .mytable {
          height: 150px;
        }
      }
    }

    .echar {
      height: 420px;
      margin: 15px 0 0 0;
    }
  }
}

@media screen  and (max-height:800px) {
  .index {
    .select {
      height: 40px;
      margin: 15px 0 0 0;

      .select_main {
        .selIn {
          .tit {
            height: 40px;
            line-height: 40px;
          }

          .yin {
            height: 40px;
            line-height: 40px;
          }

          .el-select {
            height: 40px;

            &:after {
              top: 2px;
              background-size: 30px 30px;
            }
          }
        }

        .el-select:after {
          background-size: 30px 30px;
        }
      }

      .select_main .el-button {
        float: left;
        width: 57px;
        height: 30px;
        line-height: 11px;
        margin-top: 6px;
      }
    }

    .echar {
      height: 320px;
      margin: 15px 0 0 0;
    }
  }
}

</style>
