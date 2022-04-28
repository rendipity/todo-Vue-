<template>

   <div id="container" v-loading.fullscreen.lock="fullscreenLoading">
     <Taskbar></Taskbar>
     <DateBar></DateBar>
     <addList></addList>
     <completedList></completedList>
   </div>
</template>

<script>
import Taskbar from "@/components/Taskbar";
import DateBar from "@/components/DateBar";
import addList from "@/components/addList";
import completedList from "@/components/completedList"
import store from '@/store/index.js'
export default {
  name: 'todoPage',
  components: {
    Taskbar,
    DateBar,
    addList,
    completedList
  },
  computed:{

  },
  data(){
    return{
      fullscreenLoading:false,
      timer:''
    }
  },
  beforeMount() {
    this.$store.commit("LoadChange",true);
    this.$store.dispatch('getTodoItems');
    this.fullscreenLoading=true;
    this.timer=setInterval(()=>{
      if (!this.$store.state.load){
        clearInterval(this.timer);
        this.fullscreenLoading=false;
        if (!this.$store.state.login) {
          this.$router.push('/login');
          this.$message({
            message:'请先登录!',
            type:"info"
          });
        }
      }
    },200)
  }
}
</script>

<style>
#container {
  min-height: 540px;
  height: 100vh
}

</style>
