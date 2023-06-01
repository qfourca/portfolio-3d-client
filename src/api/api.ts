import axios from 'axios';

export default axios.create({
  timeout: 10000,
  baseURL: 'https://notion.qfourca.net',
});
