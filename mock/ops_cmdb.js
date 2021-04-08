const Mock = require("mockjs");

const List = [];
const count = 10;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      instance_name: Mock.Random.date("T"),
      project: "@integer(1, 100)",
      project_data: {
        name: "@integer(0,1)"
      },
      code_registry_type: "git",
      code_registry_url: "@string(1,10)",
      build_method: "@string(1,3)",
      language: "@string(1,2)",

      deploy_path: "/",
      host_deploy: "@boolean",
      docker_deploy: "@boolean",
      start_command: "",
      stop_command: "",
      describe: ""
    })
  );
}

export default [
  // smart_form_task_list
  {
    url: "/ops_cmdb/project_instance/",
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

  // del project_instance
  {
    url: `/ops_cmdb/project_instanceDel/`,
    type: "delete",
    response: config => {
      const { id } = config.query;
      let results = List;
      for (const task in results) {
        if (results[task].id === +id) {
          results.splice(task, 1);
          return {
            code: 20000,
            data: results
          };
        }
      }
    }
  }
];
