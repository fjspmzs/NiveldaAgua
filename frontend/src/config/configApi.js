import axios from 'axios';

const baseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'http://backend:8080';

export default axios.create({ baseURL });
