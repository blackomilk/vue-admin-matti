import request from '@/utils/request'
//
export function getCabinet(listQuery) {
  return request({
    url: '/ops_cmdb/cabinet/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getCabinetDetailById(id) {
  return request({
    url: '/ops_cmdb/cabinet/' + id,
    method: 'get',
  })
}
export function addCabinet(data) {
  return request({
    url: '/ops_cmdb/cabinet/',
    method: 'post',
    data
  })
}
export function updateCabinet(id, data) {
  return request({
    url: '/ops_cmdb/cabinet/' + id + '/',
    method: 'put',
    data
  })
}
export function delCabinet(id) {
  return request({
    url: '/ops_cmdb/cabinet/' + id + '/',
    method: 'delete',
  })
}
//
export function getCabinetUnit(listQuery) {
  return request({
    url: '/ops_cmdb/cabinet_unit/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getCabinetUnitDetailById(id) {
  return request({
    url: '/ops_cmdb/cabinet_unit/' + id,
    method: 'get',
  })
}
export function addCabinetUnit(data) {
  return request({
    url: '/ops_cmdb/cabinet_unit/',
    method: 'post',
    data
  })
}
export function updateCabinetUnit(id, data) {
  return request({
    url: '/ops_cmdb/cabinet_unit/' + id + '/',
    method: 'put',
    data
  })
}
export function delCabinetUnit(id) {
  return request({
    url: '/ops_cmdb/cabinet_unit/' + id + '/',
    method: 'delete',
  })
}
//
export function getComputerRoom(listQuery) {
  return request({
    url: '/ops_cmdb/computer_room/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getComputerRoomDetailById(id) {
  return request({
    url: '/ops_cmdb/computer_room/' + id,
    method: 'get',
  })
}
export function addComputerRoom(data) {
  return request({
    url: '/ops_cmdb/computer_room/',
    method: 'post',
    data
  })
}
export function updateComputerRoom(id, data) {
  return request({
    url: '/ops_cmdb/computer_room/' + id + '/',
    method: 'put',
    data
  })
}
export function delComputerRoom(id) {
  return request({
    url: '/ops_cmdb/computer_room/' + id + '/',
    method: 'delete',
  })
}
//
export function getDeployEnv(listQuery) {
  return request({
    url: '/system/deploy_env_config/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
// export function getDeployEnvSearch(query) {
//   return request({
//     url: '/ops_cmdb/deploy_env/',
//     method: 'get',
//     params: {
//       query
//     }
//   })
// }
export function getDeployEnvDetailById(id) {
  return request({
    url: '/system/deploy_env_config/' + id,
    method: 'get',
  })
}
export function addDeployEnv(data) {
  return request({
    url: '/system/deploy_env_config/',
    method: 'post',
    data
  })
}
export function updateDeployEnv(id, data) {
  return request({
    url: '/system/deploy_env_config/' + id + '/',
    method: 'put',
    data
  })
}
export function delDeployEnv(id) {
  return request({
    url: '/system/deploy_env_config/' + id + '/',
    method: 'delete',
  })
}
//
export function getHostProjectInstance(listQuery) {
  return request({
    url: '/ops_cmdb/host_project_instance/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getHostProjectInstanceDetailById(id) {
  return request({
    url: '/ops_cmdb/host_project_instance/' + id + '/',
    method: 'get',
  })
}
export function addHostProjectInstance(data) {
  return request({
    url: '/ops_cmdb/host_project_instance/',
    method: 'post',
    data
  })
}
export function updateHostProjectInstance(id, data) {
  return request({
    url: '/ops_cmdb/host_project_instance/' + id + '/',
    method: 'put',
    data
  })
}
export function delHostProjectInstance(id) {
  return request({
    url: '/ops_cmdb/host_project_instance/' + id + '/',
    method: 'delete',
  })
}
//
export function getN9eAmsHost(listQuery) {
  return request({
    url: '/ops_cmdb/n9e_ams_host/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getN9eHostByEnv(listQuery) {
  return request({
    url: '/ops_cmdb/get_n9e_host_by_env',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getN9eTplByEnv(listQuery) {
  return request({
    url: '/ops_cmdb/get_n9e_tpl_by_env',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
//
export function getN9eAmsHostPhysical(listQuery) {
  return request({
    url: '/ops_cmdb/n9e_ams_host_physical/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getN9eAmsHostPhysicalDetailById(id) {
  return request({
    url: '/ops_cmdb/n9e_ams_host_physical/' + id,
    method: 'get',
  })
}
export function addN9eAmsHostPhysical(data) {
  return request({
    url: '/ops_cmdb/n9e_ams_host_physical/',
    method: 'post',
    data
  })
}
export function updateN9eAmsHostPhysical(id, data) {
  return request({
    url: '/ops_cmdb/n9e_ams_host_physical/' + id + '/',
    method: 'put',
    data
  })
}
export function delN9eAmsHostPhysical(id) {
  return request({
    url: '/ops_cmdb/n9e_ams_host_physical/' + id + '/',
    method: 'delete',
  })
}
//
export function getN9eAmsHostVirtual(listQuery) {
  return request({
    url: '/ops_cmdb/n9e_ams_host_virtual/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getN9eAmsHostVirtualDetailById(id) {
  return request({
    url: '/ops_cmdb/n9e_ams_host_virtual/' + id,
    method: 'get',
  })
}
export function addN9eAmsHostVirtual(data) {
  return request({
    url: '/ops_cmdb/n9e_ams_host_virtual/',
    method: 'post',
    data
  })
}
export function updateN9eAmsHostVirtual(id, data) {
  return request({
    url: '/ops_cmdb/n9e_ams_host_virtual/' + id + '/',
    method: 'put',
    data
  })
}
export function delN9eAmsHostVirtual(id) {
  return request({
    url: '/ops_cmdb/n9e_ams_host_virtual/' + id + '/',
    method: 'delete',
  })
}
//
export function getN9eJobTaskTpl(listQuery) {
  return request({
    url: '/ops_cmdb/n9e_job_task_tpl/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getN9eJobTaskTplDetailById(id) {
  return request({
    url: '/ops_cmdb/n9e_job_task_tpl/' + id,
    method: 'get',
  })
}
export function addN9eJobTaskTpl(data) {
  return request({
    url: '/ops_cmdb/n9e_job_task_tpl/',
    method: 'post',
    data
  })
}
export function updateN9eJobTaskTpl(id, data) {
  return request({
    url: '/ops_cmdb/n9e_job_task_tpl/' + id + '/',
    method: 'put',
    data
  })
}
export function delN9eJobTaskTpl(id) {
  return request({
    url: '/ops_cmdb/n9e_job_task_tpl/' + id + '/',
    method: 'delete',
  })
}
//
export function getProduct(listQuery) {
  return request({
    url: '/ops_cmdb/product/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getProductDetailById(id) {
  return request({
    url: '/ops_cmdb/product/' + id,
    method: 'get',
  })
}
export function addProduct(data) {
  return request({
    url: '/ops_cmdb/product/',
    method: 'post',
    data
  })
}
export function updateProduct(id, data) {
  return request({
    url: '/ops_cmdb/product/' + id + '/',
    method: 'put',
    data
  })
}
export function delProduct(id) {
  return request({
    url: '/ops_cmdb/product/' + id + '/',
    method: 'delete',
  })
}
//
export function getProject(listQuery) {
  return request({
    url: '/ops_cmdb/project/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getProjectDetailById(id) {
  return request({
    url: '/ops_cmdb/project/' + id,
    method: 'get',
  })
}
export function addProject(data) {
  return request({
    url: '/ops_cmdb/project/',
    method: 'post',
    data
  })
}
export function updateProject(id, data) {
  return request({
    url: '/ops_cmdb/project/' + id + '/',
    method: 'put',
    data
  })
}
export function delProject(id) {
  return request({
    url: '/ops_cmdb/project/' + id + '/',
    method: 'delete',
  })
}
//
export function getProjectInstance(listQuery) {
  return request({
    url: '/ops_cmdb/project_instance/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getProjectInstanceDetailById(id) {
  return request({
    url: '/ops_cmdb/project_instance/' + id,
    method: 'get',
  })
}
export function addProjectInstance(data) {
  return request({
    url: '/ops_cmdb/project_instance/',
    method: 'post',
    data
  })
}
export function updateProjectInstance(id, data) {
  return request({
    url: '/ops_cmdb/project_instance/' + id + '/',
    method: 'put',
    data
  })
}
export function delProjectInstance(id) {
  return request({
    url: '/ops_cmdb/project_instanceDel/',
    method: 'delete',
    params: {
      id
    }
  })
}
//
export function getServiceProvider(listQuery) {
  return request({
    url: '/ops_cmdb/service_provider/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getServiceProviderDetailById(id) {
  return request({
    url: '/ops_cmdb/service_provider/' + id,
    method: 'get',
  })
}
export function addServiceProvider(data) {
  return request({
    url: '/ops_cmdb/service_provider/',
    method: 'post',
    data
  })
}
export function updateServiceProvider(id, data) {
  return request({
    url: '/ops_cmdb/service_provider/' + id + '/',
    method: 'put',
    data
  })
}
export function delServiceProvider(id) {
  return request({
    url: '/ops_cmdb/service_provider/' + id + '/',
    method: 'delete',
  })
}
//
export function getWayneApp(listQuery) {
  return request({
    url: '/ops_cmdb/wayne_app/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getWayneAppDetailById(id) {
  return request({
    url: '/ops_cmdb/wayne_app/' + id,
    method: 'get',
  })
}
export function getWayneAppByNamespaceId(listQuery) {
  return request({
    url: '/ops_cmdb/get_wayne_app_by_namespace_id',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function addWayneApp(data) {
  return request({
    url: '/ops_cmdb/wayne_app/',
    method: 'post',
    data
  })
}
export function updateWayneApp(id, data) {
  return request({
    url: '/ops_cmdb/wayne_app/' + id + '/',
    method: 'put',
    data
  })
}
export function delWayneApp(id) {
  return request({
    url: '/ops_cmdb/wayne_app/' + id + '/',
    method: 'delete',
  })
}
//
export function getWayneDeployment(listQuery) {
  return request({
    url: '/ops_cmdb/wayne_deployment/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getWayneDeploymentDetailById(id) {
  return request({
    url: '/ops_cmdb/wayne_deployment/' + id,
    method: 'get',
  })
}
export function getWayneDeploymentByAppId(listQuery) {
  return request({
    url: '/ops_cmdb/get_wayne_deployment_by_app_id',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function addWayneDeployment(data) {
  return request({
    url: '/ops_cmdb/wayne_deployment/',
    method: 'post',
    data
  })
}
export function updateWayneDeployment(id, data) {
  return request({
    url: '/ops_cmdb/wayne_deployment/' + id + '/',
    method: 'put',
    data
  })
}
export function delWayneDeployment(id) {
  return request({
    url: '/ops_cmdb/wayne_deployment/' + id + '/',
    method: 'delete',
  })
}
//
export function getWayneNamespace(listQuery) {
  return request({
    url: '/ops_cmdb/wayne_namespace/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getWayneNamespaceDetailById(id) {
  return request({
    url: '/ops_cmdb/wayne_namespace/' + id,
    method: 'get',
  })
}
export function addWayneNamespace(data) {
  return request({
    url: '/ops_cmdb/wayne_namespace/',
    method: 'post',
    data
  })
}
export function updateWayneNamespace(id, data) {
  return request({
    url: '/ops_cmdb/wayne_namespace/' + id + '/',
    method: 'put',
    data
  })
}
export function delWayneNamespace(id) {
  return request({
    url: '/ops_cmdb/wayne_namespace/' + id + '/',
    method: 'delete',
  })
}
//
export function getWayneProjectInstance(listQuery) {
  return request({
    url: '/ops_cmdb/wayne_project_instance/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getWayneProjectInstanceDetailById(id) {
  return request({
    url: '/ops_cmdb/wayne_project_instance/' + id,
    method: 'get',
  })
}
export function getWayneProjectInstanceByInstanceId(listQuery) {
  return request({
    url: '/ops_cmdb/get_wayne_project_instance_by_instance_id',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function addWayneProjectInstance(data) {
  return request({
    url: '/ops_cmdb/wayne_project_instance/',
    method: 'post',
    data
  })
}
export function updateWayneProjectInstance(id, data) {
  return request({
    url: '/ops_cmdb/wayne_project_instance/' + id + '/',
    method: 'put',
    data
  })
}
export function delWayneProjectInstance(id) {
  return request({
    url: '/ops_cmdb/wayne_project_instance/' + id + '/',
    method: 'delete',
  })
}
export function getOrganization(listQuery) {
  return request({
    url: 'system/organization/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}


