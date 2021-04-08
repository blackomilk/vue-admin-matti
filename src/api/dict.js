import request from '@/utils/request'

export function getSystemConfig(query) {
  return request({
    url: '/system/system_config/',
    method: 'get',
    params: {
      ...query
    }
  })
}
export function getSystemConfigDetailById(id) {
  return request({
    url: '/system/system_config/' + id,
    method: 'get'
  })
}
export function addSystemConfig(data) {
  return request({
    url: '/system/system_config/',
    method: 'post',
    data
  })
}
export function updateSystemConfig(id, data) {
  return request({
    url: `/system/system_config/${id}/`,
    method: 'put',
    data
  })
}
export function delSystemConfig(id) {
  return request({
    url: `/system/system_config/${id}/`,
    method: 'delete'
  })
}
