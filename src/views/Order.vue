<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderMenuStore } from '../stores/orderMenuStore';
import { placeOrder } from '@/api/orderService';

const router = useRouter();
const orderMenuStore = useOrderMenuStore();

const state = reactive({
  selectedMenu: {
    name: '',
    price: 0,
    stockQuantity: 0
  },
  order: {
    menuId: 0,
    price: 0,
    quantity: 1
  },
  loading: false
})

onMounted(() => {
  console.log('orderMenuStore.state.selectedMenu: ', orderMenuStore.state.selectedMenu);
  state.selectedMenu = orderMenuStore.state.selectedMenu;
  state.order.menuId = state.selectedMenu.menuId;
  state.order.price = state.selectedMenu.price;
});

const validateQuantity = () => {
  if (state.order.quantity < 1) { state.order.quantity = 1; }
  else if(state.order.quantity > state.selectedMenu.stockQuantity) { state.order.quantity = state.selectedMenu.stockQuantity; }

  state.order.price = state.order.quantity * state.selectedMenu.price;
};

const submitOrder = async () => {
  state.loading = true;
  const params = {
    items: []
  }
  params.items.push(state.order);
  await placeOrder(params);
  orderMenuStore.clearOrder(); // 주문 완료 후 스토어 비우기
  router.push('/'); // 홈으로 이동
  
};

</script>
<template>
  <div class="container" v-if="state.selectedMenu">
    <h2>주문 확인</h2>
    <div class="order-detail">
      <h3>{{ state.selectedMenu.name }}</h3>
      <p>단가: {{ state.selectedMenu.price.toLocaleString() }}원</p>
      
      <div class="quantity-control">
        <label>수량: </label>
        <input type="number" v-model.number="state.order.quantity" min="1" @input="validateQuantity" />
      </div>

      <hr />
      <div class="total-section">
        <span>총 주문 금액: </span>
        <span class="total-price">{{ state.order.price.toLocaleString() }}원</span>
      </div>

      <button class="order-btn" @click="submitOrder" :disabled="state.loading">
        {{ state.loading ? '주문 중...' : '결제 및 주문하기' }}
      </button>
    </div>
  </div>
  <div v-else class="error">
    <p>선택된 메뉴가 없습니다.</p>
    <button @click="$router.push('/')">메뉴판으로 돌아가기</button>
  </div>
</template>


