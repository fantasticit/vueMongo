import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000'
            : 'http://localhost:5000',
  timeout: 5000
});

// http.interceptors.request.use({
//   req => req,
//   err => err
// })
http.interceptors.response.use(
  res => {
    if (res.data.code === 'ok') {
      return res.data.data
    } else if (res.data.code === 'no') {
      throw new Error(res.data.message)
    }
  },

  err => {
    throw new Error(err)
  }
)

export default http
