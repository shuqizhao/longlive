import { ElMessage } from 'element-plus'
import { user_login, user_logout } from '@/api/operate'
import { getToken, setToken, getRoles, setRoles, getName, setName, getTenantName, setTenantName } from '@/utils/auth'

const state = {
  token: getToken(),
  roles: getRoles(),
  name: getName(),
  tenantName: getTenantName()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
    setRoles(roles)
  },
  SET_NAME: (state, name) => {
    state.name = name
    setName(name)
  },
  SET_TENANT_NAME: (state, tenantName) => {
    state.tenantName = tenantName
    setTenantName(tenantName)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      user_login(userInfo)
        .then((res) => {
          debugger
          res.jwt_user_token = res.access_token;
          res.jwt_user_role='一个好人';
          res.jwt_user_role='admin';
          res.jwt_user_tenant_name='一个好企业';
          if (res.jwt_user_token) {
            commit('SET_TOKEN', res.jwt_user_token)
            commit('SET_ROLES', res.jwt_user_role)
            commit('SET_NAME', res.jwt_user_name)
            commit('SET_TENANT_NAME', res.jwt_user_tenant_name)
            sessionStorage.setItem('userInfo',JSON.stringify(res))
          } else {
            ElMessage({
              type: 'error',
              message: res.message
            })
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', '')
      commit('SET_NAME', '')
      commit('SET_TENANT_NAME', '')
      dispatch('tagsView/delAllViews', null, { root: true })
      sessionStorage.removeItem('userInfo')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
