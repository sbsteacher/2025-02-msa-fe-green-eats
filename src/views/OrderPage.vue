<template>
  <div style="padding: 20px; font-family: sans-serif;">
    <h1 style="color: #2c3e50;">Green-Eats 메뉴판 (MSA 예제)</h1>
    <hr />
    <div v-if="store.menus.length === 0">메뉴를 불러오는 중이거나 메뉴가 없습니다.</div>
    <div v-for="menu in store.menus" :key="menu.id" 
         style="border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 8px;">
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

<script setup>
import { useOrderStore } from '@/stores/useOrderStore'
import { onMounted } from 'vue'

const store = useOrderStore()

onMounted(() => {
  store.fetchMenus()
})
</script>
