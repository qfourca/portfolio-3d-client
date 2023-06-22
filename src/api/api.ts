import axios from 'axios';

export default axios.create({
  timeout: 10000,
  baseURL: __ISPRODUCTION__
    ? 'https://notion.qfourca.net'
    : 'https://notion.qfourca.net',
});
