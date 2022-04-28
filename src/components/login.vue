<template>
<div id="background">
  <div id="container">
    <sidebar title="还未注册？" describe="立即注册，享受高效生活!" button="注册" push-to="/signup"></sidebar>
    <div id="information">
      <div id="lHeader">欢迎回来</div>
      <div>
        <input type="text" placeholder="用户名" v-model="username">
      </div>
      <div>
        <input type="password" placeholder="密码" v-model="password">
      </div>
      <div id="lButton"><button @click="submit">登录</button></div>
    </div>
  </div>
</div>
</template>

<script>
import sidebar from "@/components/sidebar";
import axios from "axios";
import path from '../properties';
export default {
  name: "login",
  components:{
    sidebar
  },
  data(){
    return {
      username:'',
      password:''
    }
  },
  methods:{
    submit(){
      if (this.username==='')
        this.$message({
          message:'用户名不能为空',
          type:"warning"
        });
      else if (this.password==='')
        this.$message({
        message:'密码不能为空',
            type:"warning"
      });
      else{
        axios.post(path.loginUrl,{
          username:this.username,
          password:this.password
        }).then((response)=>{
          if (response.data.status==='400'){
            this.$message({
              message:'账号或密码错误',
              type:"error"
            })
          }
          else if(response.data.status==='200'){
            localStorage.setItem("Authorization",response.data.data);
            this.$router.push("/todo");
          }
        },(error)=>{
          console.log(error)
          this.$message({
            message:'系统错误，请重试',
            type:"error"
          })
        })
      }
    }
  }
}
</script>

<style scoped>
#background{
  background-color: #F0F0F0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#container{
  width: 750px;
  height: 540px;
  border-radius: 12px;
}
#information{
  background-color: #FFFFFF;
  height: 100%;
  width: 500px;
  float: left;
  text-align: center;
}
#lHeader{
  height: 200px;
  margin: 0;
  font-weight: bolder;
  font-size: 30px;
  line-height: 150px;
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
  width: 200px;
  height: 35px;
  border-radius: 14px;
  background-color: #DEB983;
  cursor: pointer;
  color: #FFFFFF;

}
button:active{
  border: 0 ;
}
</style>