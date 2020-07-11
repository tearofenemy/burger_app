import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-dd691.firebaseio.com/'
});

export default instance;