import request from '@/utils/request'
//
export function getSystemConfig(listQuery) {
  return request({
    url: '/system/system_config/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getDeployEnvConfig(listQuery) {
  return request({
    url: '/system/deploy_env_config/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getSystemConfigDetailById(id) {
  return request({
    url: '/system/system_config/' + id,
    method: 'get',
  })
}
export function addSystemConfig(data) {
  return request({
    url: '/system/system_config/',
    method: 'post',
    data
  })
}
export function updateSystemConfig(id,data) {
  return request({
    url: '/system/system_config/' + id + '/',  
    method: 'put',
    data
  })
}
export function delSystemConfig(id) {
  return request({
    url: '/system/system_config/' + id + '/',
    method: 'delete',
  })
}