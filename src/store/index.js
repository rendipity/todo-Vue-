import Vuex from 'vuex';
import Vue from 'vue';
import {nanoid} from 'nanoid';
import axios from 'axios';
import path from '../properties'
import login from "@/components/login";
Vue.use(Vuex)
function DeleteThing(things,id){
    let changeThing;
    let i = 0
    for (; i < things.length; i++) {
        if (things[i].id===id) {
            changeThing=things[i];
            break;
        }
    }
    things.splice(i,1);
    return changeThing;
}
const state={
    planThings:[],
    completedThings:[],
    login:true,
    load:false,
    choosedDate:'今天'
}
const actions={
    dateChange(context,dateType){
        let date;
        switch (dateType){
            case 1:
                date='今天';
                break;
            case 2:
                date='最近七天';
                break;
            case 3:
                date='全部';
        }
        if (context.state.choosedDate===date)
            return;
        axios.get(path.getItemsUrl+'?timeType='+dateType,{
            headers:{
                Authorization:localStorage.getItem('Authorization')
            }
        }).then((reponse)=>{
            console.log(reponse)
            context.commit('GetItems',reponse.data.data);
        },(err)=>{
            console.log(err);
        });

        context.commit("DataChange",date);
    },
    addPlanThing(context,content){
        let id=nanoid();
        let dt=new Date();
        let time=dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
        let newThing={
            id:id,
            things:content,
            time:time,
            state:"1"
        }
        //数据库插入数据
        axios.post(path.addItemUrl,newThing,{
            headers:{
                Authorization:localStorage.getItem('Authorization')
            }
        }).then((response)=>{
            console.log('添加 '+content+' 成功');
        },(error)=>{
            console.log('添加 '+content+' 失败');
        })
        //前端更新数据
        context.commit("AddPlanThing",newThing);
    },
    planToFinish(context,id){
        let updatedItem={
            id,
            state:'0',
        }
        //数据库修改
        context.dispatch("statusChange",updatedItem);
        //页面数据修改
        context.commit("PlanToFinish",id);
    },
    finishToPlan(context,id){
        //数据库修改
        let updatedItem={
            id,
            state:'1',
        }
        context.dispatch("statusChange",updatedItem);
        //页面数据修改
        context.commit("FinishToPlan",id);
    },
    statusChange(context,updatedItem){
        axios.put(path.updateItemUrl,updatedItem,{
            headers:{Authorization:localStorage.getItem('Authorization')}
        }).then(()=>{
            console.log('修改成功!');
        },()=>{
            console.log('修改失败！');
        })
    },
    deletePlan(context,id){
        context.dispatch('deleteItem',id);
        context.commit("DeletePlan",id);
    },
    deleteFinish(context,id){
        context.dispatch('deleteItem',id);
        //数据库修改
        context.commit("DeleteFinish",id);
    },
    deleteItem(context,id){
        //数据库修改
        axios.delete(path.deleteItemUrl+'/'+id,{
            headers:{Authorization:localStorage.getItem('Authorization')}
        })
    },
    getTodoItems(context){
            axios.get(path.getItemsUrl,
            {
                headers:{Authorization:localStorage.getItem('Authorization')}
            }).then((data)=>{
                context.commit("loginChange",true);
                context.commit("GetItems",data.data.data)
            },(err)=>{
                console.log(err);
                context.commit("loginChange",false);
                context.commit("LoadChange",false);

            })
    }
}
const mutations={
    DataChange(state,date){
        state.choosedDate = date;
    },
    AddPlanThing(state,newThing){
        state.planThings.push(newThing);
    },
    PlanToFinish(state,id){
      let changeThings=DeleteThing(state.planThings,id);
      state.completedThings.push(changeThings);
    },
    FinishToPlan(state,id){
        let changeThings=DeleteThing(state.completedThings,id);
        state.planThings.push(changeThings);
    },
    DeletePlan(state,id){
        DeleteThing(state.planThings,id);
    },
    DeleteFinish(state,id){
        DeleteThing(state.completedThings,id);
    },
    loginChange(state,status){
        state.login=status;
    },
    GetItems(state,data){
        state.completedThings=[];
        state.planThings=[];
        for ( let i=0;i<data.length;i++){
            if (data[i].state==='0')
                state.completedThings.push(data[i])
            else if (data[i].state==='1')
                state.planThings.push(data[i]);
        }
        state.load=false;
    },
    LoadChange(state,status){
     state.load=status;
    }
}
const getters={
    login(state){
        return state.login;
    }
}
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});