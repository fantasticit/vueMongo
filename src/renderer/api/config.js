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
  res => res.data
)

export default http
