<script setup>
import { useAuthenticationStore } from '@/stores/authentication';

const authenticationStore = useAuthenticationStore();


</script>
<template>
  <div>
    <header>
      <router-link to="/">Home</router-link>
      <template v-if="!authenticationStore.state.isSigned">
        <router-link to="/signin">로그인</router-link>
        <router-link to="/signup">회원가입</router-link>
      </template>
      <template v-else>
        <a href="#" @click="authenticationStore.authSignout()">로그아웃</a>
        <router-link to="/menu/add">메뉴등록</router-link>
        <router-link to="/order/list">주문조회</router-link>
      </template>
    </header>
    <main>
      <router-view />
    </main>
  </div>
  
</template>

