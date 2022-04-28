<template>
  <div id="background">
    <div id="container">
      <div id="Sidebar"><sidebar title="已有账号？" describe="有账号就立即登录吧，好久不见!" button="登录" push-to="/login"></sidebar></div>
      <div id="information">
        <div id="rHeader">立即注册</div>
        <input type="text" placeholder="账号" v-model="username">
        <input type="password" placeholder="密码" v-model="password">
        <input type="phone" placeholder="手机号" v-model="phone">
        <input type="verifyCode" placeholder="验证码" v-model="verifyCode">
        <div id="rButton">
          <button class='eventButton' @click="getVerifyCode" v-if="!isCounting">获取验证码</button>
          <button  id="count" v-else>{{count}}</button>
          <button class='eventButton' @click="signup">注册</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import path from '../properties'
import axios from "axios";
import {nanoid} from "nanoid";
export default {
  name: "login",
  components:{
    sidebar
  },
  data(){
    return {
      username:'',
      password:'',
      phone:'',
      verifyCode:'',
      count:60,
      isCounting:false,
      timer:''
    }
  },
  methods:{
    getVerifyCode(){
      if (this.phone==='') {
        this.$message('手机号不能为空');
        return;
      }
      let regex = new RegExp(/1[0-9]{10}/);
      if (!regex.test(this.phone)){
          this.$message("手机不合法");
          return ;
      }
      this.isCounting=true;
      this.timer=setInterval(()=>{
        if (this.count<=0){
          clearInterval(this.timer);
          this.isCounting=false;
          this.count=60;
        }else
          this.count-=1;
      },1000);
      axios.get(path.verifyCodeUrl+'?phone='+this.phone).then((response)=>{
        if (response.data.status==='200')
          this.$message({
            message:'验证码发送成功!',
            type:'success'
          })
        else if (response.data.status==='500'){
          this.$message({
            message:'验证码发送过于频繁!',
            type:'info'
          })
        }
        else
          console.log(response);
      },(error)=>{
        console.log(error);
        this.$message({
          message:'请求错误，请重试!',
          type:'error'
            })
      })
    },
    signup(){
      if (this.username==='')
        this.$message({
          message: '用户名不能为空',
          type: 'warning'
        })
      else if (this.password==='')
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        })
      else if (this.verifyCode==='')
        this.$message({
          message:'验证码不能为空',
          type:'warning'
        })
      else{
        axios.post(path.signupUrl,{
          id:nanoid(),
          username:this.username,
          password:this.password,
          phone:this.phone,
          verifyCode:this.verifyCode
        }).then(response=>{
          if (response.data.status==='500')
            this.$message({
              message:'该用户名已经存在',
              type:'error'
            })
          else if (response.data.status==='200') {
            this.$message({
              message: '注册成功,快登录！',
              type: 'success'
            })
            this.$router.push('/login');
          }
          else
            console.log(response)
        },error=>{
          console.log(error);
        })
      }
    }
  }
}
</script>
<style scoped>
#Sidebar{
  float: left;
}
#container{
  width: 750px;
  height: 540px;
  border-radius: 12px;
}
#background{
  background-color: #F0F0F0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#information{
  background-color: #FFFFFF;
  height: 100%;
  width: 500px;
  float: right;
  text-align: center;
}
#rHeader{
   height: 130px;
   margin: 0;
   font-weight: bolder;
   font-size: 30px;
   line-height: 90px;
   box-sizing: border-box;
   padding-top: 50px;
 }
input{
  width:200px;
  height: 35px;
  margin: 20px 40px;
  text-align: center;
  font-size: 14px;
  border: 0;
  border-bottom: 2px solid black;
}
input:focus{
  border: 0 ;
  border-bottom: 2px solid black;
  outline: none;
}
button{
  border:0;
  width: 150px;
  height: 35px;
  margin: 0 20px;
  border-radius: 14px;
  background-color: #DEB983;
  cursor: pointer;
  color: #FFFFFF;
}
#count{
  cursor: auto
}
.eventButton:active{
  background-color: #AB865E;
}
</style>