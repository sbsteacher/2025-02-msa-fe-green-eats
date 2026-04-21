import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { getOrderList } from '@/api/orderService';

export const useOrderStore = defineStore('order', () => {
    const state = reactive({
        orders: [],
        lastId: null,
        hasNext: true,
        isLoading: false
    });

    async function fetchOrders() {
        if (state.isLoading || !state.hasNext) return;

        state.isLoading = true;
        try {
            const params = {
                last_id: state.lastId
            }
            const res = await getOrderList(params);

            state.orders.push(...res.resultData.orders);
            state.hasNext = res.resultData.hasNext;
            state.lastId = res.resultData.lastId;
        } catch (err) {
            console.error("주문 목록 로드 실패:", err);
        } finally {
            state.isLoading = false;
        }
    }

    return { state, fetchOrders };
});