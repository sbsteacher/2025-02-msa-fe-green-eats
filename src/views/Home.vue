<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMenuList } from '@/api/storeService';
import { useOrderMenuStore } from '../stores/orderMenuStore';

const router = useRouter();
const menus = ref([]);
const orderMenuStore = useOrderMenuStore();

// 메뉴 목록 조회 (Gateway -> Store Service)
const fetchMenus = async () => {    
    const res = await getMenuList();
    menus.value = res.resultData;
};

// 주문 화면으로 이동
const goToOrder = async menu => {
    console.log('menu: ', menu);
    const selectedMenu = { 
        menuId: menu.id,
        name: menu.name,
        price: menu.price,
        stockQuantity: menu.stockQuantity
    }
    orderMenuStore.setOrderMenu(selectedMenu);
    router.push('/order');
};

onMounted(fetchMenus);
</script>

<template>
    <div>
    <h1>오늘의 메뉴</h1>
    <div v-for="menu in menus" :key="menu.id" class="menu-card">
        <h3>{{ menu.name }}</h3>
        <p>가격: {{ menu.price.toLocaleString() }}원</p>
        <p>재고: {{ menu.stockQuantity }}개</p>
        <button @click="goToOrder(menu)">주문하기</button>
    </div>
    </div>
</template>