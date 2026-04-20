<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { signup } from '@/api/userService';

const router = useRouter();

const form = ref({
    email: 'mic@naver.com',
    name: '홍길동',
    password: '1212',
});

const passwordConfirm = ref('1212');
const isSubmitting = ref(false);

// 비밀번호 일치 여부 확인 (Computed)
const passwordError = computed(() => {
    if (passwordConfirm.value && form.value.password !== passwordConfirm.value) {
        return '비밀번호가 일치하지 않습니다.';
    }
    return '';
});

const handleSignup = async () => {
    if (passwordError.value) return;

    isSubmitting.value = true;

    // User Service의 회원가입 API 호출
    await signup(form.value);
    
    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    router.push('/signin');

    isSubmitting.value = false;

};
</script>

<template>
    <div class="signup-container">
        <h2>Green Eats 회원가입</h2>
        <form @submit.prevent="handleSignup">
        <div class="form-group">
            <label>이메일</label>
            <input v-model="form.email" type="email" placeholder="example@green.com" required />
        </div>

        <div class="form-group">
            <label>이름</label>
            <input v-model="form.name" type="text" placeholder="이름을 입력하세요" required />
        </div>

        <div class="form-group">
            <label>비밀번호</label>
            <input v-model="form.password" type="password" placeholder="비밀번호" required />
        </div>

        <div class="form-group">
            <label>비밀번호 확인</label>
            <input v-model="passwordConfirm" type="password" placeholder="비밀번호 재입력" required />
        </div>

        <p v-if="passwordError" class="error-msg">{{ passwordError }}</p>

        <button type="submit" :disabled="isSubmitting">회원가입</button>
        </form>
        
        <div class="link-section">
        <p>이미 계정이 있으신가요? <router-link to="/login">로그인하기</router-link></p>
        </div>
    </div>
</template>

<style scoped>
.signup-container {
    max-width: 400  px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:disabled {
    background-color: #ccc;
}

.error-msg {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
}

.link-section {
    margin-top: 20px;
    text-align: center;
}
</style>