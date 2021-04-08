import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const perms = store.getters && store.getters.roles
    const permissionperms = value
    if (roles.includes('admin')) {
      return true
    } // 如果是超管,都可以操作
    const hasPermission = roles.some(perm => {
      return permissionperms.includes(perm)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
