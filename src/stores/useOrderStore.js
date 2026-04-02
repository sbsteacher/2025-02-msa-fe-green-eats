import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrderStore = defineStore('order', {
  state: () => ({
    menus: []
  }),
  actions: {
    async fetchMenus() {
      try {
        const res = await axios.get('/api/stores/menus')
        this.menus = res.data
      } catch (err) {
        console.error('메뉴 로드 실패', err)
      }
    },
    async placeOrder(menuId, count) {
      try {
        // TSID는 매우 큰 숫자이므로 문자열로 확실히 변환하여 전송
        await axios.post('/api/orders', { 
          menuId: String(menuId), 
          count: count 
        })
        alert('주문이 성공적으로 완료되었습니다!')
        await this.fetchMenus() // 재고 갱신을 위해 다시 로드
      } catch (err) {
        alert('주문 실패: ' + (err.response?.data?.message || '서버 오류'))
      }
    }
  }
})
