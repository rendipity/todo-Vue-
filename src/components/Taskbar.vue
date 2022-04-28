<template>
<div id="container">
  <img src="../assets/Image/headphoto.png" alt="headphoto" id="headphoto">
    <el-tooltip class="item" effect="light" content="任务" placement="right-start" visible-arrow="false">
      <i class="el-icon-time icon" :active="active===1" @click="ToActive(1)"></i>
    </el-tooltip>
    <el-tooltip class="item" effect="light" content="打卡" placement="right-start" visible-arrow="false">
      <i class="el-icon-edit-outline icon" :active="active===2" @click="ToActive(2)"></i>
    </el-tooltip>
    <el-tooltip class="item" effect="light" content="帮助" placement="right-start" visible-arrow="false">
        <i class="el-icon-add-location icon" :active="active===3" @click="ToActive(3)"></i>
    </el-tooltip>
</div>
</template>

<script>
export default {
  name: 'TaskBar',
  data(){
    return {
      active:1
    }
  },
  methods:{
    ToActive(id){
      this.active=id;
    }
  }
}
</script>
<style scoped>
#container{
  background-color:skyblue;
  box-sizing: border-box;
  width: 10%;
  padding: 50px 0;
  float: left;
}
*{
  display: block;
}
img#headphoto{
  width: 80px;
  text-align: center;
  margin: auto;
  margin-bottom: 30px;
  border-radius: 50%;
}
.icon{
  font-size: 30px;
  margin-left: 50px;
  margin-top: 20px;
  cursor: pointer;
  color:#FFFFFF;
}
.icon:active{
  color: #00B7FF;
}
div[active=true] i{
  color: red;
}
i[active=true]{
  color: #00B7FF;
}
</style>