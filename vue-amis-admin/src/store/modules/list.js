import { customerList } from '@/api/userManage'
import { hospitalActiveList } from '@/api/hospitalManage'

const state = {
  departActiveList: [],
  hospitalActiveList: []
}

const mutations = {
  SET_DEPART_ACTIVE_LIST: (state, list) => {
    state.departActiveList = list
  },
  SET_HOSPITAL_ACTIVE_LIST: (state, list) => {
    state.SET_HOSPITAL_ACTIVE_LIST = list
  }
}

const actions = {
  departList({ commit }) {
    return new Promise((resolve, reject) => {
      customerList()
        .then((res) => {
          commit('SET_DEPART_ACTIVE_LIST', res.datas)
          resolve(res.datas)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  hospitalList({ commit }) {
    return new Promise((resolve, reject) => {
      hospitalActiveList()
        .then((res) => {
          commit('SET_HOSPITAL_ACTIVE_LIST', res.datas)
          resolve(res.datas)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
