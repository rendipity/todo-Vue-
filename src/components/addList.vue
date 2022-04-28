<template>
<div id="container">
  <div id="head">
    <div id="timeHeader">{{choosedDate}}</div>
    <input type="text" placeholder="+ 添加任务，回车即可创建" @keydown.enter="addOne()" v-model="addThing">
  </div>
  <div class="thingsType">
    待完成
  </div>
  <ul ref="list" v-if="things.length>0" id="itemList">
    <li v-for="thing in things" :key="thing.id">
      <Item :id="thing.id" :thing="thing.things" :date=dateFormat(thing.time)></Item>
    </li>
  </ul>
</div>

</template>

<script>
import Item from '@/components/planThingItem'
export default {
  name: "addList",
  computed: {
      things(){
        return this.$store.state.planThings;
      },
    choosedDate(){
        return this.$store.state.choosedDate;
    }
  },
  components:{
    Item
  },
  data(){
    return{
      addThing:'',
    }
  },
  methods:{
    dateFormat(date){
      let dates=date.split('-');
      let now=new Date();
      if(Number(dates[1])===now.getMonth()+1&&Number(dates[2])===now.getDate())
        return '今天'
      else if (Number(dates[1])===now.getMonth()+1&&Number(dates[2])===now.getDate()-1)
        return '昨天';
      else
        return Number(dates[1]) + '月' + Number(dates[2]) + '日';
    },
    addOne(){
      if (this.addThing!=='') {
        this.$store.dispatch("addPlanThing", this.addThing);
        this.addThing = "";
      }
    }
  }
}
</script>

<style scoped>
  #container{
    float: left;
    width: 40%;
    background-color: gold;
  }
  #head{
    font-size: 28px;
  }
  #head button{
    margin: 25px 10px 0 20px;
  }
  #head input{
    width: 530px;
    height: 32px;
    border-radius: 10px;
    display: block;
    margin: 20px auto;
    padding-left: 10px;
  }
  #operate button{
    margin-left: 20px;
  }
  ul{
    list-style-type:none;
    width: 520px;
    min-height: 500px;
  }
  li{
    margin-top: 8px;
    transform: translateX(-16px);
  }
#itemList{
  height: 500px;
  overflow: scroll;
}
#timeHeader{
  margin: 14px 0 -13px 21px;
}
.thingsType{
  font-size: 16px;
  margin:-12px 0 -13px 23px;
}
</style>