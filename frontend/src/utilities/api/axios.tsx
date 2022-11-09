import axios from 'axios';

export default axios.create({
    baseURL: 'https://sayyara.herokuapp.com/api'
});