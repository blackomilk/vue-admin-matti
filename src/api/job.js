import request from '@/utils/request'

export function getJobOrderTemplate(listQuery) {
  return request({
    url: '/ops_job/job_order_template/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function addJobOrderTemplate(data) {
  return request({
    url: '/ops_job/job_order_template/',
    method: 'post',
    data
  })
}

export function getJobOrderTemplateDetailById(id) {
  return request({
    url: '/ops_job/job_order_template/' + id,
    method: 'get',
  })
}
export function updateJobOrderTemplate(id,data) {
  return request({
    url: '/ops_job/job_order_template/' + id + '/',  
    method: 'put',
    data
  })
}
export function delJobOrderTemplate(id) {
  return request({
    url: '/ops_job/job_order_template/' + id + '/',
    method: 'delete',
  })
}
export function getJobOrder(listQuery) {
  return request({
    url: '/ops_job/job_order/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function addJobOrder(data) {
  return request({
    url: '/ops_job/job_order/',
    method: 'post',
    data
  })
}
export function updateJobOrder(id,data) {
  return request({
    url: '/ops_job/job_order/' + id + '/',  
    method: 'put',
    data
  })
}
export function delJobOrder(id) {
  return request({
    url: '/ops_job/job_order/' + id + '/',
    method: 'delete',
  })
}
export function getJobOrderField(listQuery) {
  return request({
    url: '/ops_job/job_order_field/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getFiledDataById(listQuery) {
  return request({
    url: '/ops_job/get_filed_data_by_id',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getCeleryTaskResult(listQuery) {
  return request({
    url: '/ops_job/celery_task_result/',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function getCeleryTaskResultDetailById(id) {
  return request({
    url: '/ops_job/celery_task_result/' + id,
    method: 'get',
  })
}
export function getOpsJobCreate(listQuery) {
  return request({
    url: '/ops_job/create',
    method: 'get',
    params: {
      ...listQuery
    }
  })
}
export function addOpsJobCreate(data) {
  return request({
    url: '/ops_job/create',
    method: 'post',
    data
  })
}

export function getN9eJobHistory() {
  return request({
    url: '/ops_job/n9e_job_history/',
    method: 'get',
  })
}
export function getN9eJobHistoryDetailById(id) {
  return request({
    url: '/ops_job/n9e_job_history' + id,
    method: 'get',
  })
}
export function addN9eJobHistory(data) {
  return request({
    url: '/ops_job/n9e_job_history',
    method: 'post',
    data
  })
}
export function updateN9eJobHistory(id,data) {
  return request({
    url: '/ops_job/n9e_job_history/' + id + '/',  
    method: 'put',
    data
  })
}
export function delN9eJobHistory(id) {
  return request({
    url: '/ops_job/n9e_job_history/' + id + '/',
    method: 'delete',
  })
}
export function getWayneJobHistory() {
  return request({
    url: '/ops_job/wayne_job_history/',
    method: 'get',
  })
}
export function getWayneJobHistoryDetailById(id) {
  return request({
    url: '/ops_job/wayne_job_history/' + id,
    method: 'get',
  })
}
export function addWayneJobHistory(data) {
  return request({
    url: '/ops_job/wayne_job_history/',
    method: 'post',
    data
  })
}
export function updateWayneJobHistory(id,data) {
  return request({
    url: '/ops_job/wayne_job_history/' + id + '/',  
    method: 'put',
    data
  })
}
export function delWayneJobHistory(id) {
  return request({
    url: '/ops_job/wayne_job_history/' + id + '/',
    method: 'delete',
  })
}
