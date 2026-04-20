import axios from 'axios';
import { reissue } from '@/api/userService';
import { useAuthenticationStore } from '@/stores/authentication';
import { useMessageModalStore } from '@/stores/messageModal';

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.withCredentials = true;

//인터셉터
axios.interceptors.response.use(
  res => res,
  async err => {
    const authenticationStore = useAuthenticationStore();
    const messageModalStore = useMessageModalStore();
    
    if (err.response) {
      const { status, config, data } = err.response;
      console.log('err.response : ', err.response);

      if (config.url === '/user/reissue' && status === 500) { //AT 재발급 시도했으나 에러 터졌음. >> RT 만료
        authenticationStore.signOut(); //로그아웃 처리
        messageModalStore.setMessage("세션이 만료되었습니다. 다시 로그인해주세요.");
        return Promise.reject(err);
      } else if (status === 401 && authenticationStore.state.isSigned) { //로그인 상태인데 401상태로 응답을 받으면 >> AT 만료
        //401 UnAuthorized 에러인데 FE 로그인 처리 되어 있다면
        try {
          await reissue(); //AccessToken 재발행 시도
          return await axios.request(err.config);
        } catch(reissueError) {
          return Promise.reject(reissueError);
        }        
      }

      const message = data?.resultMessage || data?.message;      
      messageModalStore.setMessage(message);
      
    } else if (err.request) {
      // 서버에서 응답 자체가 없는 경우 (네트워크 에러, 서버 다운 등)
      messageModalStore.setMessage("서버와 통신할 수 없습니다. 네트워크 상태를 확인해주세요.");
    } else {
      // 요청 설정 중 에러 발생
      messageModalStore.setMessage("요청 중 알 수 없는 오류가 발생했습니다.");
    }

    return Promise.reject(err);
  }
);

export default axios;