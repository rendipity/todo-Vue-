<template>
  <div id="container">
    <div class='thingsType'>
      已完成
    </div>
    <ul ref="list" v-if="things.length>0" id="ItemList">
      <li v-for="thing in things" :key="thing.id">
        <Item :id="thing.id" :thing="thing.things" :date=dateFormat(thing.time)></Item>
      </li>
    </ul>

  </div>
</template>

<script>
import Item from '@/components/finishedItem';
export default {
  name: "completedList",
  computed:{
    things(){
      return this.$store.state.completedThings;
    }
  },
  methods:{
    dateFormat(date){
      let dates=date.split('-');
      console.log(date);
      console.log(dates);
      let now=new Date();
      if(Number(dates[1])===now.getMonth()+1&&Number(dates[2])===now.getDate())
        return '今天'
      else if (Number(dates[1])===now.getMonth()+1&&Number(dates[2])===now.getDate()-1)
        return '昨天';
      else
        return Number(dates[1]) + '月' + Number(dates[2]) + '日';
    },
  },
  components:{
    Item
  },
}
</script>

<style scoped>
#container{
  width: 30%;
  float: left;
  background-color: orange;

}
ul{
  list-style-type:none;
  width: 380px;
  min-height: 500px;
  margin:0;
}
li{
  margin-top: 8px;
  transform: translateX(-16px);
}
#ItemList{
  overflow: scroll;
  max-height: 510px;
}
.thingsType{
  font-size: 16px;
  margin:18px 0 0 27px;
}
</style>