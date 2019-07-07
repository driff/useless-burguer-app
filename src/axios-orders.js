import axios from 'axios';

const INSTANCE = axios.create({
    baseURL: 'https://useless-burgerbuilder.firebaseio.com/'
});

export default INSTANCE;
