import axios from './httpRequester';

const path = '/order';

export const postOrder = async data => {    
    const res = await axios.post(path, data);
    return res.data; // 생성된 Order ID 반환
};

export const getOrderList = async params => {
    const res = await axios.get(path, { params });
    return res.data; 
}

export const getOrderDetail = async params => {
    const res = await axios.get(`${path}/${params}`);
    return res.data; 
}