<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { postMenu, getCodeList } from '@/api/storeService';

const router = useRouter();


const state = reactive({
  menu: {
    name: '',
    price: 0,
    stockQuantity: 0,
    menuCategory: ''
  },
  categoryList: [],
  loading: false
})

onMounted(async () => {
  const params = {
    code_type: 'menuCategory'
  }
  const res = await getCodeList(params);
  state.categoryList = res.resultData;
});


const submit = async () => {
  state.loading = true;
  const res = await postMenu(state.menu);  
  state.loading = false;
};

</script>
<template>
  <div class="container">
    <h2>메뉴 등록</h2>
    <div class="detail">
      <div class="control">
        <label for="name">메뉴명: </label>
        <input type="text" id="name" v-model="state.menu.name">
      </div>
      <div class="control">
        <label for="stockQuantity">수량: </label>
        <input type="number" id="stockQuantity" v-model.number="state.menu.stockQuantity" min="0" />
      </div>
      <div class="control">
        <label for="price">가격: </label>
        <input type="number" id="price" v-model.number="state.menu.price" min="100" />
      </div>
      <div class="control">
        <label for="category">카테고리: </label>
        <select id="category" v-model="state.menu.menuCategory">
          <option v-for="item in state.categoryList">
            {{ item.value }}
          </option>
        </select>
      </div>

      <button class="btn" @click="submit" :disabled="state.loading">
        {{ state.loading ? '등록 중...' : '등록' }}
      </button>
    </div>
  </div>  
</template>


