<template>
<div class="header">
  <header>
    <div class="top">
      <div class="head_left">
          <img src="../../common/img/zqzy.png">
          <h3>中启智源CRM</h3>
      </div>
     <!-- <div class="head_right ">
        <span class="icon iconfont icon-yonghu"></span>
        <span class="user">{{this.name}}</span>
        <span class="logout" @click="logout">退出</span>
      </div>-->
      <el-dropdown class="head_right" trigger="click">
      <span class="el-dropdown-link">
        <i class="icon iconfont icon-yonghu"></i>
        <i class="user">{{this.name}}</i>
        <i class="el-icon-arrow-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="icon_esc" @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </header>
 <!--
    <el-breadcrumb class="navigation" separator="/">
          <el-breadcrumb-item v-for="(item,index)  in header" :key="index" :to="{ path: item.path }">{{item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
-->
</div>

</template>

<script>
import { getCookie ,clearCookie } from '../../common/js/unit.js'
export default {
  name: 'header',
  data () {
    return {
      name:"admin",
      header:[

        {
          name:"首页",
          path:'/login'
        },
        {
          name:"项目",
          path:'/login'
        }
      ]
    }
  },
  props:{
      head:Array
  },
  components:{

  },
  created(){
   this.name = JSON.parse(getCookie('rzfx')).name

  },
  methods:{
    logout(){
         clearCookie('rzfx')
        this.$router.push({path: '/'})
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.header {
  header {
    width: 100%;
    height: 50px;
    background: #354052;

    .top {
      width: 97%;
      height: 100%;
      margin: 0 auto;

      .head_left {
        float: left;
        width: 190px;
        height: 100%;
        line-height: 50px;
        color: #fff;

        img {
          float: left;
          width: 50px;
          height: 100%;
        }
      }

      .head_right {
        float: right;
        width:135px;
        height: 100%;
        line-height: 50px;
        margin-right: 20px;

        .icon {
          display: block;
          float: left;
          width: 35px;
          height: 50px;
          line-height: 50px;
          color: #fff;
        }

        .icon-user:before {
          display: block;
          width: 50px;
          height: 50px;
          margin-left: -34px;
          font-size: 20px;
        }

        .user {
          display: block;
          float: left;
          width: 50px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          color: #fff;
          &:hover{
             color:#20a0ff;
          }
        }
        .icon-yonghu:before{
          font-size:25px;
        }
        .el-icon-arrow-down{
              line-height: 50px;
              float: right;
              height: 50px;
              color: #fff;
              &:hover{
                color:#20a0ff
              }
        }

        .logout {
          float: right;
          width: 50px;
          height: 50px;
          color: #fff;

          cursor: pointer;

          &:hover {
            color: #24a5e0;
          }
        }
      }
    }
  }

  .nav {
    width: 100%;
    height: 50px;
    height: 50px;
    line-height: 1;
    line-height: 50px;
    font-size: 13px;
    font-size: 16px;
    background: #fff;

    .navigation {
      width: 97%;
      height: 100%;
      line-height: 4;
      margin: 0 auto;
      font-size: 13px;

      .el-breadcrumb__item:last-child .el-breadcrumb__item__inner,
      .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a,
      .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a:hover,
      .el-breadcrumb__item:last-child .el-breadcrumb__item__inner:hover {
        color: #20a0ff;

        cursor: pointer;
      }
    }
  }
}

</style>
