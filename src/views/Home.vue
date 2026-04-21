<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMenuList } from '@/api/storeService';
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const menus = ref([]);
const cartStore = useCartStore();

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
        <div v-if="cartStore.totalCount > 0" class="cart-summary">
            <span>현재 {{ cartStore.totalCount }}개의 상품이 담겼습니다.</span>
            <button @click="$router.push('/order')">주문하러 가기</button>
        </div>
        <div v-for="menu in menus" :key="menu.id" class="menu-card">
            <h3>{{ menu.name }}</h3>
            <p>가격: {{ menu.price.toLocaleString() }}원</p>
            <p>재고: {{ menu.stockQuantity }}개</p>
            <button @click="cartStore.addToCart(menu)">장바구니 담기</button>
        </div>
    </div>
</template>