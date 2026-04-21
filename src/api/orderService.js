import axios from './httpRequester';

const path = '/order';

export const postOrder = async data => {    
    const res = await axios.post(path, data);
    return res.data; // 생성된 Order ID 반환
};