import axios from 'axios';
import store from '@/store';

const querystring = require('querystring');

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000'
            : 'http://localhost:5000',
  timeout: 8000
});

http.interceptors.request.use(
  req => {
    return req
  },
  err => {
    throw new Error(err)
  }
)
http.interceptors.response.use(
  res => {
    if (res.data.code === 'ok') {
      return res.data.data
    } else if (res.data.code === 'no') {
      throw new Error(res.data.message)
    }
  },

  err => {
    if (err.response) {
      store.dispatch('addError', err.response.data);
      throw new Error(
        err.response.data &&
        err.response.data.message ||
        '失败'
      )
    } else {
      throw new Error(err)
    }
  }
)

export default http
