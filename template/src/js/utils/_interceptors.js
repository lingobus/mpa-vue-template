import cookies from 'cookies-js'
import axios from 'axios'
import Token from '../../../common/token.js'
const TokenPP = Token.PP
axios.interceptors.request.use(config => {
  if (config.headers.token) return config
  const token = cookies.get(TokenPP) || ''
  if (!token) return config
  config.headers[TokenPP] = token
  return config
})

axios.interceptors.response.use(resp => {
  if (resp.data && resp.data.code == 1004) {
    window.location = '/login'
  }
  return resp
})
