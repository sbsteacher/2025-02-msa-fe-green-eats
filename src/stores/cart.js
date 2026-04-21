// src/stores/cartStore.js
import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  // 1. State (reactive)
  // 단일 ref([]) 대신 객체 형태로 상태를 묶어서 관리합니다.
    const state = reactive({
        items: []
    });

    // 2. Getters (computed)
    // state.items로 바로 접근하므로 .value가 필요 없습니다.
    const totalCount = computed(() => state.items.length);
    
    const totalAmount = computed(() => {
        return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    });

    // 3. Actions (function)
    function addToCart(menu) {
        const existingItem = state.items.find(i => i.menuId === menu.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            // reactive 내부 배열에 직접 push합니다.
            const item = {
                menuId: menu.id,
                quantity: 1,
                price: menu.price
            }
            state.items.push(item);
        }
    }

    function removeItem(menuId) {
        state.items = state.items.filter(i => i.menuId !== menuId);
    }

    function clearCart() {
        state.items = [];
    }

    // 컴포넌트에서 사용할 변수와 함수를 노출합니다.
    // state 자체를 넘기면 컴포넌트에서도 state.items로 접근하게 됩니다.
    return { 
        state, // state 객체 전체를 반환
        totalCount, 
        totalAmount, 
        addToCart, 
        removeItem, 
        clearCart 
    };
});