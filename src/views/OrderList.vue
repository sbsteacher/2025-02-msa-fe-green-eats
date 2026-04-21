<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/order';

const router = useRouter();
const orderStore = useOrderStore();

onMounted(() => {
  if (orderStore.state.orders.length === 0) {
    orderStore.fetchOrders();
  }
});

const goToDetail = (orderId) => {
  router.push({ name: 'OrderDetail', params: { orderId } });
};
</script>

<template>
  <div class="list-container">
    <h2>📋 전체 주문 내역 (20개씩 보기)</h2>
    
    <div v-for="order in orderStore.state.orders" :key="order.orderId" class="order-item" @click="goToDetail(order.orderId)">
      <div class="info">
        <span class="user-badge">{{ order.userName }} 님의 주문</span>
        <span class="order-no">#{{ order.orderId }}</span>
      </div>
      <div class="details">
        <strong>{{ order.totalAmount.toLocaleString() }}원</strong>
        <span :class="['status', order.status]">{{ order.status }}</span>
      </div>
    </div>

    <div class="footer">
      <button 
        v-if="orderStore.state.hasNext" 
        @click="orderStore.fetchOrders"
        :disabled="orderStore.state.isLoading"
      >
        {{ orderStore.state.isLoading ? '로딩 중...' : '주문 20개 더보기' }}
      </button>
    </div>
  </div>
</template>



<style scoped>
.user-badge { background: #e3f2fd; color: #1976d2; padding: 2px 8px; border-radius: 4px; font-weight: bold; margin-right: 10px; }
.order-item { border-bottom: 1px solid #eee; padding: 15px; display: flex; justify-content: space-between; }
.status.COMPLETED { color: green; }
</style>