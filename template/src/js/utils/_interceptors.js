import cookies from 'cookies-js'
import axios from 'axios'
import Token from '../../../common/settings.js'
const TOKEN_NAME = Token.PROJECT
axios.interceptors.request.use(config => {
  if (config.headers.token) return config
  const token = cookies.get(TOKEN_NAME) || ''
  if (!token) return config
  config.headers[TOKEN_NAME] = token
  return config
})

axios.interceptors.response.use(resp => {
  if (resp.data && resp.data.code == 1004) {
    window.location = '/login'
  }
  return resp
})
