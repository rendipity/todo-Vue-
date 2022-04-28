import VueRouter from 'vue-router'
import todoPage from "@/pages/todoPage";
import userPage from "@/pages/userPage";
import login from "@/components/login";
import signup from "@/components/signup";

const router= new VueRouter({
    routes:[
        {
            path:'/',
            component:userPage,
            children:[
                {
                    path:'/signup',
                    name:'signup',
                    component:signup
                },
                {
                    path:'/login',
                    name:'login',
                    component:login

                },
                {
                    path:'/',
                    component:login

                }
            ]
        },
        {
            path:'/todo',
            name:'todoPage',
            component:todoPage
        },
    ],
});
router.beforeEach((to,from,next)=>{
    if (to.name!=='todoPage'||localStorage.getItem("Authorization"))
        next();
    else
        next('/login')
})
export default router;