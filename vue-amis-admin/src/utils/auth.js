import Cookies from 'js-cookie'

const TokenKey = 'token'
const RoleKey = 'roles'
const nameKey = 'name'
const tenantNameKey = 'tenantNameKey'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRoles() {
  return Cookies.get(RoleKey)
}

export function setRoles(role) {
  return Cookies.set(RoleKey, role)
}

export function removeRoles() {
  return Cookies.remove(RoleKey)
}

export function getName() {
  return Cookies.get(nameKey)
}

export function setName(name) {
  return Cookies.set(nameKey, name)
}

export function removeName() {
  return Cookies.remove(nameKey)
}

export function setTenantName(name) {
  return Cookies.set(tenantNameKey, name)
}

export function getTenantName() {
  return Cookies.get(tenantNameKey)
}

export function removeTenantName() {
  return Cookies.remove(tenantNameKey)
}
