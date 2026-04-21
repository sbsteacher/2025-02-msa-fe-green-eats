<script setup>
import { ref } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication';
import { useRouter } from 'vue-router';

const email = ref('mic8@gmail.com');
const password = ref('1212');
const authentication = useAuthenticationStore();
const router = useRouter();

const handleLogin = async () => {    
    const params = {
        email: email.value,
        password: password.value
    }
    await authentication.authSignin(params);
    alert('로그인 성공!');
    router.push('/'); // 홈으로 이동
};
</script>

<template>
    <div class="login-container">
        <h2>Green Eats 로그인</h2>
        <input v-model="email" placeholder="이메일" />
        <input v-model="password" type="password" placeholder="비밀번호" />
        <button @click="handleLogin">로그인</button>
    </div>
</template>