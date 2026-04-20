import { reactive } from 'vue'
import { defineStore } from 'pinia';

export const useOrderMenuStore = defineStore('order', () => {
    const state = reactive({
        selectedMenu: null
    });

    const setOrderMenu = menu => state.selectedMenu = menu;
    const clearOrderMenu = () => state.selectedMenu = null;

    return { state, setOrderMenu, clearOrderMenu };
});