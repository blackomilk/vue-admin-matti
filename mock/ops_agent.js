const Mock = require("mockjs");

const List = [];
const count = 50;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      celery_task_id: +Mock.Random.date("T"),
      code: "@integer(1, 100)",
      form_id: 222222,
      mata_data: `[
      {"callback_url": "http://127.0.0.1:8080/form/smartForm/taskCallback", 
      "form_id": "22222222", 
      "spu": "project", 
      "task_id": "22222222"
      },
      {"callback_url": "http://127.0.0.1:8080/form/smartForm/taskCallback", 
      "form_id": "22222222", 
      "spu": "project", 
      "task_id": "22222222"    
    }]`,
      task_id: 222222,
      result: `{"dat": "", "err": "deploy task filed,docker image not found."}`
    })
  );
}

export default [
  // smart_form_task_list
  {
    url: "/ops_agent/smart_form_task/",
    type: "get",
    response: config => {
      const { page, page_size } = config.query;
      const results = List.filter(
        (item, index) =>
          index < page_size * page && index >= page_size * (page - 1)
      );
      return {
        code: 20000,
        data: {
          count: List.length,
          page: page,
          page_size: page_size,
          results: results
        }
      };
    }
  },

  // smart_form_task_list_detail
  {
    url: `/ops_agent/smart_form_taskByid/`,
    type: "get",
    response: config => {
      const { id } = config.query;

      for (const task of List) {
        if (task.id === +id) {
          return {
            code: 20000,
            data: task
          };
        }
      }
    }
  }
];
