import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { signin, signout } from '@/api/userService';
import router from '@/router'

export const useAuthenticationStore = defineStore(
    "authentication", 
    () => {
        const state = reactive({            
            signedUser: {
                id: 0,
                name: ''
            },            
            isSigned: false
        });

        const authSignin = async data => {
            const res = await signin(data);
            state.signedUser = res.resultData;
            state.isSigned = true;
        }
        

        const authSignout = async () => {
            console.log('signOut 처리')
            const res = await signout();
            state.isSigned = false;
            state.signedUser = null;            
            await router.push('/sign-in')
        }

        return { state, authSignin, authSignout };
    }, 
    { persist: true }
);