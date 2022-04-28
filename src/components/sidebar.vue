<template>
  <div id="sidebar">
    <div id="rHeader">
      <div id="title">{{title}}</div>
      <div id="rDescribe">{{describe}}</div>
    </div>
    <div id="rButton"><button @click="transfer">{{button}}</button></div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  props:['title','describe','button','pushTo'],
  methods:{
    transfer(){
      this.$router.push(this.pushTo);
    }
  }
}
</script>

<style scoped>
#sidebar{
  width: 250px;
  height: 540px;
  background-color: #00B7FF;
  float: right;
  background-image: url("../assets/Image/loginBackground.jpeg");
  background-repeat: no-repeat;
  background-position-x: 54%;
  background-size: cover;
  color: #FFFFFF;
  text-align: center;
}
#rHeader{
  margin-top: 50px;
  width: 100%;
  height: 200px;
  font-size: 30px;
  box-sizing: border-box;
  padding-top: 50px;
}
#rHeader #rDescribe{
  margin-top: 10px;
  font-size: 16px;
}
#rButton{
  margin-top: 158px;
}
#rButton button{
  height: 35px;
  border-radius: 14px;
  cursor: pointer;
  color: #FFFFFF;
  border: 2px solid #FFFFFF;
  width: 90px;
  background-color: rgb(255,255,255,0);
}
</style>