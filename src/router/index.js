import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/Signin.vue';
import Home from '@/views/Home.vue';
import Order from '@/views/Order.vue';
import OrderList from '@/views/OrderList.vue';
import OrderDetail from '@/views/OrderDetail.vue';

import { useAuthenticationStore } from '@/stores/authentication';
import { useMessageModalStore } from '@/stores/messageModal';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/signin', component: SignIn },
    { path: '/signup', component: () => import('@/views/Signup.vue') },
    { path: '/menu/add', component: () => import('@/views/MenuAdd.vue') },
    { path: '/order', component: Order },
    { path: '/order/list', component: OrderList },
    { path: '/order/:orderId', name: 'OrderDetail', component: OrderDetail, props: true },
  ],
});

//네비게이션 가드(주소의 변화가 있으면 호출)
// router.beforeEach( (to, from, next) => {
//   const authenticationStore = useAuthenticationStore();
//   const commentModalStore = useCommentModalStore();
//   const isSigned = authenticationStore.state.isSigned; //true: 로그인 상태, false: 비로그인 상태
  
//   if( commentModalStore.state.showModal ) { //댓글 모달창이 켜져 있다면 
//     commentModalStore.close(); //닫는다.
//   }

//   //비로그인 상태에서 로그인이 필요한 path로 가려고 할 때 
//   if( to.meta.requiresAuth && !isSigned ) {
//     return next('/sign-in');
//   }

//   //로그인 상태에서 비 로그인이 필요 한 path로 가려고 할 때
//   if( to.meta.requiresGuest && isSigned ) {
//     return next('/');
//   }

//   next(); //원래 처리대로
// } );

export default router
