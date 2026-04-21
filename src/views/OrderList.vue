<script setup>
import { ref, onMounted } from 'vue';


const orders = ref([]);

// 주문 내역 가져오기 (Gateway -> Order Service)
const fetchOrders = async () => {
  try {
    // 주의: Gateway YAML 설정이 /api/order/** 인지 /api/orders/** 인지 확인 필수!
    const res = await api.get('/api/order'); 
    orders.value = res.data;
  } catch (err) {
    console.error('주문 내역 로딩 실패:', err);
    if (err.response?.status === 401) {
      alert('로그인이 필요한 서비스입니다.');
    }
  }
};

// 날짜 포맷팅 유틸리티
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

// 가격 콤마 포맷팅
const formatPrice = (price) => {
  return price.toLocaleString();
};

onMounted(() => {
  fetchOrders();
});
</script>
<template>
  <div style="padding: 20px; font-family: sans-serif;">
    <h1 style="color: #2c3e50;">Green-Eats 메뉴판 (MSA 예제)</h1>
    <hr />
    <div v-if="store.menus.length === 0">메뉴를 불러오는 중이거나 메뉴가 없습니다.</div>
    <div v-for="menu in store.menus" :key="menu.id" style="border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 8px;">
      <h3>{{ menu.name }}</h3>
      <p>가격: {{ menu.price }}원</p>
      <p>잔여 재고: <strong>{{ menu.stockQuantity }}</strong>개</p>
      <button @click="store.placeOrder(menu.id, 1)"
              :disabled="menu.stockQuantity <= 0"
              style="background-color: #42b983; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
        {{ menu.stockQuantity > 0 ? '지금 주문하기' : '품절' }}
      </button>
    </div>
  </div>
</template>


