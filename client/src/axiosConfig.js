import axios from 'axios';
const url = axios.create({
  baseURL: 'http://localhost:5002/api/user',
  headers: {

    'Content-Type': 'application/json'
  }
});

export default url;