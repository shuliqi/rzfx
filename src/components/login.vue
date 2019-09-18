<template>
  <div class="login">
     <div class="container">
       <div class="con">
          <div class="title">
            <span>中启树立起时智源CRM</span>
          </div>
          <div class="main_login" v-loading="loading" :element-loading-text="loading_text">
              <div class="zhang">使用账号登录</div>
              <div class="error iconfont icon-error" v-show="isShow">{{tips}}</div>
              <el-form ref="form" :model="form" label-width="80px" label-position="left" :rules="rules" :show-message="message"  v-on:keyup.enter="submitForm('form')">
                  <el-form-item prop="name">
                        <el-input placeholder="用户名" v-model="form.name" @keyup.enter.native="submitForm('form')" class="iconfont icon-iconfontyonghuming" icon="circle-close"  :on-icon-click="nameIconClick"></el-input>
                  </el-form-item>
                  <el-form-item prop="pass">
                        <el-input  type="password"placeholder="密码" @keyup.enter.native="submitForm('form')" v-model="form.pass"  class="iconfont icon-mima" icon="circle-close" :on-icon-click="passIconClick"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">{{login}}</el-button>
                  </el-form-item>
          </el-form></div>
       </div>
       <div class="footer">
            <div class="footerL">
              <div class="message">
                  <p>
                    <span>联系电话：010-88389223</span>
                    <span>Q Q：3418905294</span>
                    <span>E-mail：zqzy@gzqol.com</span>
                    <span>地址：北京市西城区黄寺大街 26 号德胜置业大厦1号楼1801</span>
                  </p>
                  <p>COPYRIGHT © 2002-2011 北京中启智源数字信息技术有限责任公司 版权所有 POWER BY DEDECMS京ICP备13046113号 京公网安备11010802013880号</p>
              </div>
            </div>
            <div class="footerR">
               <img src="../common/img/zqzy.png">
               <p>中启智源</p>
            </div>
        </div>
       </div>
  </div>
</template>

<script>
import echar from './public/echars'
import Tb from './public/table'
import {urlEncode ,setCookie } from '../common/js/unit.js'
export default {
  name: 'login',
  data () {
    return {
      isShow:false,
      login:'登录',
      loading:false,
      tips:'请输入密码',
      message:false,
      loading_text:'加载中',
      form:{
        name:'',
        pass:''
      },
      rules: {
          name: [
            { required: true, message: '', trigger: 'blur' },
          ],
          pass: [
            { required: true, message: '', trigger: 'blur' }
          ]
      }
    }
  },
  components:{
    echar,
    Tb
  },
  created(){

  },
  methods:{
    nameIconClick(value){
          this.form.name = ''
    },
    passIconClick(value){
          this.form.pass = ''
    },
    timeTips(){
      let setInt = setInterval(() => {
        if(!this.loading){
            this.isShow = true
            setTimeout(() => {
                  this.isShow = false
            }, 2000);
            clearInterval(setInt)
        }
      },2000)
    },
    submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //  this.loading = true
             this.loading_text = '登陆中'
             let data = {
               username:this.form.name,
               password:this.form.pass
             }
             console.log(data)
             this.$ajax.get('http://sc.91onix.com/api/login/getuser' + urlEncode(data,true)).then(res => {
               console.log(res)

                if(res.status === 200){
                    setCookie('rzfx',JSON.stringify({name:res.data.UserName}),"h1")
                    this.$router.push({path:'index'})
                }
             },error => {

                 this.isShow = true
                setTimeout(() => {
                  this.isShow = false
                }, 3000);
                this.tips = "用户名或密码错误"
                this.form.name = ""
                this.form.pass = ""

             })

          } else {
            if(this.form.pass == '' && this.form.name == '' ){
               this.tips = "请输入用户名和密码"
            }else{
                if(this.form.name == ''){
                    this.tips = "请输入用户名"
                }
                if(this.form.pass == ''){
                  this.tips = "请输入密码"
                }
            }
            this.isShow = true
            setTimeout(() => {
                this.isShow = false
            }, 3000);
            return false;
          }
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.login {
  width: 100%;
  height: 100%;
  background: url("../common/img//bg.png") no-repeat;
  -webkit-background-size: 100% 100%;
     -moz-background-size: 100% 100%;
          background-size: 100% 100%;

  .container {
    width: 60%;
    height: 100%;
    margin: 0 auto;

    .con {
      width: 460px;
      height: 70%;
      margin: 0 auto;
      overflow: hidden;

      .title {
        position: relative;
        width: 100%;
        height: 35%;

        span {
          position: absolute;
          text-align: center;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70px;
          margin: auto;
          font-size: 60px;
          color: #fff;
        }
      }

      .main_login {
        position: relative;
        height: 57%;
        background: rgba(255, 255, 255, .9);
        overflow: hidden;

        .icon-iconfontyonghuming:before {
          position: absolute;
          left: 0;
          width: 55px;
          height: 53px;
          text-align: center;
          line-height: 2;
          margin-top: 1px;
          margin-left: 1px;
          font-size: 25px;
          color: #fff;
          background: #ccc;
        }

        .icon-error:before {
          line-height: 2;
          padding: 0 17px;
          color: #20a0ff;
        }

        .icon-mima:before {
          position: absolute;
          left: 0;
          width: 55px;
          height: 53px;
          text-align: center;
          line-height: 2;
          margin-top: 1px;
          margin-left: 1px;
          font-size: 25px;
          color: #fff;
          background: #ccc;
        }

        .error {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 380px;
          height: 35px;
          text-align: left;
          line-height: 35px;
          margin: 0 auto;
          margin: 6% auto;
          background: #bce3f5;
        }

        .el-form {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 380px;
          margin: 20% auto;

          .el-form-item {
            height: 55px;
            margin-bottom: 35px;
            margin-left: -80px;

            .el-form-item__content {
              height: 100%;

              .el-input {
                height: 100%;

                .el-input__inner {
                  height: 100%;
                  padding-left: 65px;
                  border-color: #e2dbdb;
                  border-radius: 0;

                  &:focus {
                    border-color: #24a5e0;
                    box-shadow: none;
                  }
                }
              }
            }

            .el-button--primary {
              width: 100%;
              width: 100%;
              height: 100%;
              border-color: #20a0ff;
              font-size: 22px;
              color: #fff;
              background-color: #20a0ff;
            }
          }
        }

        .zhang {
          text-align: left;
          padding: 22px 0 1px 41px;
          font-size: 28px;
          font-size: 30px;
        }
      }
    }

    .footer {
      width: 100%;
      height: 30%;

      .footerL {
        position: relative;
        float: left;
        width: 80%;
        height: 80px;
        border-right: 1px solid rgba(255, 255, 255, .5);
        margin-top: 10%;
        font-size: 14px;

        .message {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50px;
          line-height: 30px;
          margin: auto;

          p {
            opacity: .5;
            color: #fff;

            filter: alpha(opacity=50);

            span {
              padding: 10px;
            }
          }
        }
      }

      .footerR {
        left: 50%;
        float: left;
        width: 62px;
        height: 80px;
        margin-top: 10%;
        margin-left: 40px;

        p {
          opacity: .5;
          font-size: 14px;
          color: #fff;

          filter: alpha(opacity=50);
        }
      }
    }
  }
}

@media screen  and (max-height:910px) {
  .login .container .con {
    height: 82%;
  }

  .login .container .footer {
    height: 12%;
  }

  .login .container .footer .footerL,
  .login .container .footer  .footerR {
    margin-top: 0;
  }
}

@media screen  and (max-height:770px) {
  .login .container .con .title {
    height: 25%;
  }

  .login .container .con .main_login {
    height: 73%;
  }
}

</style>
