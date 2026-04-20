import axios from './httpRequester';

const path = '/store/menu';

export const postMenu = async data => {
    const res = await axios.post(path, data);
    return res.data;
}

export const getMenuList = async () => {    
    const res = await axios.get(path);
    return res.data; // 생성된 Order ID 반환
};

export const getCodeList = async params => {
    const res = await axios.get('/store/code', { params });
    return res.data;
}