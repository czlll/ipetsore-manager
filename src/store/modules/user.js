import Cookies from 'js-cookie'

const user = {
  state: {
    status: Cookies.get('login-status'),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    LOGIN_IN: state => {
      Cookies.set('login-status',1)
      // state.status = true;
    },

    LOGIN_OUT: state => {
      Cookies.set('login-status','',-1)
      // state.status = false;
    }
  },

    actions: {
      dologin({commit,state}){
        return new Promise((resolve, reject) => {
            commit('LOGIN_IN')
            resolve()
          }).catch(error => {
            reject(error)
          })
      },

      dologout({commit,state}){

        return new Promise((resolve, reject) => {
            commit('LOGIN_OUT')
            resolve()
          }).catch(error => {
            reject(error)
          })
      }
    }
}

export default user
