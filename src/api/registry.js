import request from '@/utils/request'

export function getImageRegistry(listQuery) {
  return request({
    url: '/ops_registry/image_registry/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getImageRegistryDetailById(id) {
  return request({
    url: '/ops_registry/image_registry/' + id,
    method: 'get',
  })
}
export function addImageRegistry(data) {
  return request({
    url: '/ops_registry/image_registry/',
    method: 'post',
    data
  })
}
export function updateImageRegistry(id,data) {
  return request({
    url: '/ops_registry/image_registry/' + id + '/',  
    method: 'put',
    data
  })
}
export function delImageRegistry(id) {
  return request({
    url: '/ops_registry/image_registry/' + id + '/',
    method: 'delete',
  })
}


export function getPackageRegistry(listQuery) {
  return request({
    url: '/ops_registry/package_registry/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getPackageRegistryDetailById(id) {
  return request({  
    url: '/ops_registry/package_registry/' + id,
    method: 'get',
  })
}
export function addPackageRegistry(data) {
  return request({
    url: '/ops_registry/package_registry/',
    method: 'post',
    data
  })
}
export function updatePackageRegistry(id,data) {
  return request({
    url: '/ops_registry/package_registry/' + id + '/',  
    method: 'put',
    data
  })
}
export function delPackageRegistry(id) {
  return request({
    url: '/ops_registry/package_registry/' + id + '/',
    method: 'delete',
  })
}


export function getRegistryConfig(listQuery) {
  return request({
    url: '/system/registry_config/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getRegistryConfigDetailById(id) {
  return request({
    url: '/system/registry_config/' + id,
    method: 'get',
  })
}
export function addRegistryConfig(data) {
  return request({
    url: '/system/registry_config/',
    method: 'post',
    data
  })
}
export function updateRegistryConfig(id,data) {
  return request({
    url: '/system/registry_config/' + id + '/',  
    method: 'put',
    data
  })
}
export function delRegistryConfig(id) {
  return request({
    url: '/system/registry_config/' + id + '/',
    method: 'delete',
  })
}