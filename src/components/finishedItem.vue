<template>
  <div id="list">
    <input type="checkbox" checked @click="stateChange">
    <span id="content">{{thing}}</span>
    <span id="icon"><i class="el-icon-delete" @click="deleteFinish"></i></span>
    <span id="date">{{date}}</span>
  </div>
</template>

<script>
export default {
  name: "FinishedItem",
  props:['id','thing','date'],
  data(){
    return{
      name:'List',
      del:false
    }
  },
  methods:{
    stateChange(){
      this.$store.dispatch("finishToPlan",this.id)
    },
    deleteFinish(){
      this.$confirm('即将删除该事项,是否继续','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      }).then(()=>{
        this.$store.dispatch("deleteFinish",this.id);
        console.log("删除成功");
      }).catch(()=>{
        console.log("取消删除");
      })

    }
  }
}
</script>

<style scoped>
#list{
  box-sizing: border-box;
  width:100%;
  height:38px;
  background-color: floralwhite;
  border: darkseagreen solid 1px;
  border-radius: 12px;
}
#list input{
  margin: 12px 15px;
  float: left;
}
#list #content{
  overflow: hidden;
  height: 36px;
  line-height: 36px;
  margin-left: 10px;
  float: left;
  font-size: 18px;
  width: 210px;
}
#date{
  width: 65px;
  font-size: 14px;
  line-height: 36px;
  float: right;
  margin-right: 2%;
  text-align: right;
}
#icon{
  float: right;
  margin-right: 20px;
  height: 100%;
}
.el-icon-delete{
  margin-top: 10px;
}
#icon{
  cursor: pointer;
}
</style>