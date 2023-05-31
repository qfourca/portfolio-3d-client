import axios from 'axios';

export default axios.create({
  timeout: 10000,
  baseURL: 'http://ec2.qfourca.net:8000',
});
