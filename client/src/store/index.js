import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    session: { isAuthenticated: false }
  },
  getters: {
    isAuthenticated (state) {
      return state.session.isAuthenticated
    },
    username (state) {
      if (state.session.isAuthenticated) {
        return state.session.email
      }
      return ''
    }
  },
  mutations: {
    setSession: (state, payload) => {
      state.session = payload
    },
    removeSession: (state) => {
      state.session = Object.assign({}, { isAuthenticated: false })
    }
  },
  actions: {
    login: ({ commit }, payload) => {
      const { email, password } = payload
      return axios.post('http://localhost:3000/api/users/login', { email, password })
        .then(res => {
          const session = Object.assign({}, res.data, { isAuthenticated: true })
          localStorage.setItem('x-auth', res.headers['x-auth'])
          commit('setSession', session)
          return res
        }).catch(err => { throw (err) })
    },
    logout: (context) => {
      const token = localStorage.getItem('x-auth')
      if (token) {
        axios.get('http://localhost:3000/api/users/logout', { headers: { 'x-auth': token } })
          .then(res => {
            localStorage.removeItem('x-auth')
            context.commit('removeSession')
          }).catch(err => {
            throw err
          })
      }
    },
    createAccount ({commit}, payload) {
      const { email, password, passwordRepeat } = payload
      axios.post('http://localhost:3000/api/users/', {
        email,
        password,
        passwordRepeat
      }).then(res => {
        const session = Object.assign({}, res.data, { isAuthenticated: true })
        localStorage.setItem('x-auth', res.headers['x-auth'])
        commit('setSession', session)
        return res
      }).catch(err => { throw (err) })
    },
    loadSession ({commit}) {
      const token = localStorage.getItem('x-auth')
      if (token) {
        axios
          .get('http://localhost:3000/api/users/me', { headers: { 'x-auth': token } })
          .then(res => {
            const session = Object.assign({}, res.data, {
              isAuthenticated: true
            })
            commit('setSession', session)
          })
          .catch(err => { throw err })
      }
    }
  }
})
