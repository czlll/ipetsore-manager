const user = {
  state: {
    // token: getToken(),
    status: false,
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    LOGIN_IN: state => {
      state.status = true;
    },

    LOGIN_OUT: state => {
      state.status = false;
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
      }
    }
}

export default user
