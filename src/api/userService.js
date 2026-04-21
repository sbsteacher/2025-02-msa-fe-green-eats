import axios from './httpRequester';

const path = '/user';

export const signin = async data => {    
    const res = await axios.post(`${path}/signin`, data);
    return res.data;
};

export const signup = async data => {    
    const res = await axios.post(`${path}/signup`, data);
    return res.data;
};

export const signout = async (data) => {    
    const res = await axios.post(`${path}/signout`, data);
    return res.data;
};

export const reissue = async () => {    
    const res = await axios.post(`${path}/reissue`);
    return res.data;
};

export const getCodeList = async params => {
    const res = await axios.get(`${path}/code`, { params });
    return res.data;
}