import http from '../utils/http'

/**
 *  @param '/manager'代表vue-cil中config，index.js中配置的代理
 */

export function login(username, password) {
  console.log(username);
  return http.post('manager/login',{username, password})
}

