import request from "@/utils/request";

export function resetHandleIspatcher(data) {
  return request({
    url: "/ops_agent/handle_ispatcher",
    method: "post",
    headers: { "Content-Type": "application/json" },
    data
  });
}
export function getSmartFormTask(listQuery) {
  return request({
    url: "/ops_agent/smart_form_task/",
    method: "get",
    params: {
      ...listQuery
    }
  });
}
export function getSmartFormTaskDetailById(id) {
  return request({
    url: `/ops_agent/smart_form_taskByid/`,
    method: "get",
    params: {
      id
    }
  });
}
