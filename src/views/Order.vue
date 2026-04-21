<script setup>
import { useCartStore } from '@/stores/cart';
import { useOrder } from '@/composables/useOrder'; // 컴포저블 임포트

// 1. 상태 스토어 가져오기
const cartStore = useCartStore();

// 2. 비즈니스 로직(Composable) 주입받기
const { isSubmitting, submitOrder } = useOrder();

// 필요하다면 컴포넌트 내에서 추가 핸들링 가능
const handleOrder = () => {
  submitOrder();
};
</script>

<template>
  <div class="order-container">
    <h2>📦 주문 확인서 (Composition API)</h2>
    
    <div v-if="cartStore.state.items.length === 0" class="empty-cart">
      <p>담긴 상품이 없습니다.</p>
      <button @click="$router.push('/')">메뉴 보러가기</button>
    </div>
    
    <div v-else>
      <div v-for="item in cartStore.state.items" :key="item.menuId" class="order-item">
        <div class="info">
          <strong>{{ item.name }}</strong>
          <span>{{ item.price.toLocaleString() }}원</span>
        </div>
        <div class="controls">
          <input type="number" v-model.number="item.quantity" min="1" />
          <button @click="cartStore.removeItem(item.menuId)">삭제</button>
        </div>
      </div>

      <div class="total-section">
        <h3>최종 결제 금액: {{ cartStore.totalAmount.toLocaleString() }}원</h3>
        <button class="order-btn" @click="handleOrder" :disabled="isSubmitting">
          {{ isSubmitting ? '주문 처리 중...' : '한번에 주문하기' }}
        </button>
      </div>
    </div>
  </div>
</template>

