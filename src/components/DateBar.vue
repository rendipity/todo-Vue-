<template>
 <div id="container">
   <ul>
   <li :active="timeType===1" @click="changeTimeType(1)">今天</li>
   <li :active="timeType===2" @click="changeTimeType(2)">最近七天</li>
   <li :active="timeType===3" @click="changeTimeType(3)">全部</li>
 </ul>
   <ul>
     <li>已完成</li>
     <li>已放弃</li>
     <li>垃圾箱</li>
   </ul>
 </div>
</template>

<script>
export default {
  name: "DataBar",
  data(){
    return{
      timeType:1,
    }
  },
  methods:{
    changeTimeType(typeId){
      this.timeType=typeId;
      let date;
      switch (this.timeType){
        case 1:
          date='今天';
          break;
        case 2:
          date='最近七天';
          break;
        case 3:
          date='全部';
          break;
      }
      this.$store.dispatch("dateChange",date);
    }
  }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}
#container{
  float: left;

  width: 20%;
  background-color:  lightpink;
}
ul{
  list-style-type:none;
  width: 150px;
  padding: 0;
  margin-bottom: 100px;
}
li{
  background-color: azure;
  border-radius: 12px;
  box-sizing:border-box;
  padding: 0px 15px;
  align-items: center;
  width: 240px;
  height: 40px;
  margin-left: 20px;
  border:lightgoldenrodyellow solid 2px;
  text-align: left;
  margin-bottom: 6px;
  line-height: 40px;
  cursor: pointer;
}
li[active=true]{
  background-color:  #E0F0F0;
  border: none;
}
</style>