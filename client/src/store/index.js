import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { isEmpty } from 'lodash'

Vue.use(Vuex)

const axiosInst = axios.create({
  baseURL: '/api/' // http://localhost:3000/api/
})

export const store = new Vuex.Store({
  state: {
    session: { isAuthenticated: false },
    search: ''
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
    },
    setSearch (state, payload) {
      state.search = payload.location
    }
  },
  actions: {
    vote (context, payload) {
      let { bar } = payload
      const token = localStorage.getItem('x-auth')
      return axiosInst.post('/bars/vote', { bar_id: bar.bar_id }, { headers: { 'x-auth': token } }) // axios.post('http://localhost:3000/api/bars/vote', { bar_id: this.bar.bar_id }, { headers: { 'x-auth': token } })
        .then(res => {
          return res
        }).catch(err => { throw (err) })
    },
    searchForBars (context, payload) {
      let { location } = payload
      if (!isEmpty(location)) {
        let encoded = encodeURI(location)
        context.commit('setSearch', { location })
        return axiosInst.get(`/bars/?location=${encoded}`) // axios.get(`http://localhost:3000/api/bars/?location=${encoded}`)
          .then(res => {
            return res
          }).catch(err => { throw (err) })
      }
    },
    login: ({ commit }, payload) => {
      const { email, password } = payload
      return axiosInst.post('/users/login', { email, password }) // axios.post('http://localhost:3000/api/users/login', { email, password })
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
        axiosInst.get('/users/logout', { headers: { 'x-auth': token } }) // axios.get('http://localhost:3000/api/users/logout', { headers: { 'x-auth': token } })
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
      axiosInst.post('/users/', {email, password, passwordRepeat}) // axios.post('http://localhost:3000/api/users/', {email, password, passwordRepeat})
        .then(res => {
          const session = Object.assign({}, res.data, { isAuthenticated: true })
          localStorage.setItem('x-auth', res.headers['x-auth'])
          commit('setSession', session)
          return res
        }).catch(err => { throw (err) })
    },
    loadSession ({commit}) {
      const token = localStorage.getItem('x-auth')
      if (token) {
        axiosInst.get('/users/me', { headers: { 'x-auth': token } }) // axios.get('http://localhost:3000/api/users/me', { headers: { 'x-auth': token } })
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
