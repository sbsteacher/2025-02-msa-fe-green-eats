// src/composables/useOrder.js
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { postOrder } from '@/api/orderService';

export function useOrder() {
    const router = useRouter();
    const cartStore = useCartStore();
    const isSubmitting = ref(false);

    const submitOrder = async () => {
        if (cartStore.state.items.length === 0) {
            alert('장바구니가 비어있습니다.');
            return;
        }
        
        if (!confirm('정말 주문하시겠습니까?')) return;

        isSubmitting.value = true;

        const payload = {
            items: cartStore.state.items.map(item => ({
                menuId: item.menuId,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: cartStore.totalAmount
        };

        try {
            const res = await postOrder(payload);
            alert(`주문 성공! 주문번호: ${res.resultData}`);
            cartStore.clearCart();
            router.push('/');
        } catch (err) {
            alert('주문 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
            isSubmitting.value = false;
        }
    };

    return {
        isSubmitting,
        submitOrder
    };
}