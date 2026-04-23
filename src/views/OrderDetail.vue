<script setup>
import { reactive, onMounted } from 'vue';
import { getOrderDetail } from '@/api/orderService';

const props = defineProps({
    orderId: {
        type: String, // URL 파라미터는 기본적으로 String입니다.
        required: true
    }
});

const state = reactive({
    detailList: [] 
})

onMounted(async () => {
    const orderId = props.orderId;
    console.log('orderId: ', orderId);
    try {
        const response = await getOrderDetail(orderId);
        state.detailList = response.resultData;
    } catch (error) {
        console.error("상세 정보 로드 실패", error);
    }
});
</script>

<template>
    <div>
        <h2>주문 상세 정보</h2>
        <div v-for="detail in state.detailList" :key="detail.id">
            <p>메뉴명: {{ detail.name }}</p>
            <p>가격: {{ detail.price.toLocaleString() }}원</p>
            <p>수량: {{ detail.quantity }}</p>            
        </div>
    </div>
</template>

