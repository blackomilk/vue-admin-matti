const Mock = require("mockjs");

const List = [];
const count = 10;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      name: Mock.Random.date("T"),
      type: "@integer(1, 100)",
      link_models: {
        name: "@integer(0,1)"
      },
      link_field: "git",
      iterm_type: "@string(1,10)",
      enum_list: "@string(1,3)"
    })
  );
}

export default [
  {
    url: "/ops_job/job_order/",
    type: "get",
    response: config => {
      const { page, page_size } = config.query;
      const results = [
        {
          "id": 124,
          "create_time": "2021-03-25 14:23:51",
          "update_time": "2021-04-02 18:30:53",
          "is_deleted": false,
          "order_number": "20210325142351",
          "mate_data": "{\"爱国福对光反射大S似懂非懂\":{\"id\":61,\"order_filed\":\"{\\\"name\\\":{\\\"id\\\":1,\\\"create_time\\\":\\\"2021-02-24 13:59:00\\\",\\\"update_time\\\":\\\"2021-02-25 19:36:37\\\",\\\"is_deleted\\\":false,\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"link_models\\\":\\\"apps.ops_cmdb.models\\\",\\\"link_field\\\":\\\"Project.name\\\",\\\"iterm_type\\\":\\\"Select\\\",\\\"enum_list\\\":\\\"\\\"},\\\"location\\\":{\\\"id\\\":6,\\\"create_time\\\":\\\"2021-02-24 18:38:00\\\",\\\"update_time\\\":\\\"2021-02-25 16:08:33\\\",\\\"is_deleted\\\":false,\\\"name\\\":\\\"location\\\",\\\"type\\\":\\\"string\\\",\\\"link_models\\\":null,\\\"link_field\\\":null,\\\"iterm_type\\\":\\\"Select\\\",\\\"enum_list\\\":\\\"aaaaaaaa,bbb,ccc\\\"},\\\"radio\\\":{\\\"id\\\":7,\\\"create_time\\\":\\\"2021-02-24 18:38:00\\\",\\\"update_time\\\":\\\"2021-02-24 18:38:42\\\",\\\"is_deleted\\\":false,\\\"name\\\":\\\"radio\\\",\\\"type\\\":\\\"bool\\\",\\\"link_models\\\":null,\\\"link_field\\\":null,\\\"iterm_type\\\":\\\"Radio\\\",\\\"enum_list\\\":null},\\\"cascader\\\":{\\\"id\\\":10,\\\"create_time\\\":\\\"2021-02-24 18:39:00\\\",\\\"update_time\\\":\\\"2021-02-24 18:39:24\\\",\\\"is_deleted\\\":false,\\\"name\\\":\\\"cascader\\\",\\\"type\\\":\\\"string\\\",\\\"link_models\\\":null,\\\"link_field\\\":null,\\\"iterm_type\\\":\\\"Cascader\\\",\\\"enum_list\\\":null}}\",\"location\":\"bbb\"}}"
        },
        {
          "id": 125,
          "create_time": "2021-04-02 15:17:07",
          "update_time": "2021-04-08 17:41:18",
          "is_deleted": false,
          "order_number": "20210402151707",
          "mate_data": "{\"3115\":{\"id\":57,\"order_filed\":\"{\\\"location\\\":{\\\"id\\\":6,\\\"create_time\\\":\\\"2021-02-24 18:38:00\\\",\\\"update_time\\\":\\\"2021-02-25 16:08:33\\\",\\\"is_deleted\\\":false,\\\"name\\\":\\\"location\\\",\\\"type\\\":\\\"string\\\",\\\"link_models\\\":null,\\\"link_field\\\":null,\\\"iterm_type\\\":\\\"Select\\\",\\\"enum_list\\\":\\\"aaaaaaaa,bbb,ccc\\\"},\\\"cascader\\\":{\\\"id\\\":10,\\\"create_time\\\":\\\"2021-02-24 18:39:00\\\",\\\"update_time\\\":\\\"2021-02-24 18:39:24\\\",\\\"is_deleted\\\":false,\\\"name\\\":\\\"cascader\\\",\\\"type\\\":\\\"string\\\",\\\"link_models\\\":null,\\\"link_field\\\":null,\\\"iterm_type\\\":\\\"Cascader\\\",\\\"enum_list\\\":null}}\",\"location\":\"aaaaaaaa\"},\"爱国福对光反射大S似懂非懂\":{\"id\":61,\"order_filed\":\"{\\\"name\\\":{\\\"id\\\":1,\\\"create_time\\\":\\\"2021-02-24 13:59:00\\\",\\\"update_time\\\":\\\"2021-02-25 19:36:37\\\",\\\"is_deleted\\\":false,\\\"name\\\":\\\"name\\\",\\\"type\\\":\\\"string\\\",\\\"link_models\\\":\\\"apps.ops_cmdb.models\\\",\\\"link_field\\\":\\\"Project.name\\\",\\\"iterm_type\\\":\\\"Select\\\",\\\"enum_list\\\":\\\"\\\"},\\\"location\\\":{\\\"id\\\":6,\\\"create_time\\\":\\\"2021-02-24 18:38:00\\\",\\\"update_time\\\":\\\"2021-02-25 16:08:33\\\",\\\"is_deleted\\\":false,\\\"name\\\":\\\"location\\\",\\\"type\\\":\\\"string\\\",\\\"link_models\\\":null,\\\"link_field\\\":null,\\\"iterm_type\\\":\\\"Select\\\",\\\"enum_list\\\":\\\"aaaaaaaa,bbb,ccc\\\"},\\\"radio\\\":{\\\"id\\\":7,\\\"create_time\\\":\\\"2021-02-24 18:38:00\\\",\\\"update_time\\\":\\\"2021-02-24 18:38:42\\\",\\\"is_deleted\\\":false,\\\"name\\\":\\\"radio\\\",\\\"type\\\":\\\"bool\\\",\\\"link_models\\\":null,\\\"link_field\\\":null,\\\"iterm_type\\\":\\\"Radio\\\",\\\"enum_list\\\":null},\\\"cascader\\\":{\\\"id\\\":10,\\\"create_time\\\":\\\"2021-02-24 18:39:00\\\",\\\"update_time\\\":\\\"2021-02-24 18:39:24\\\",\\\"is_deleted\\\":false,\\\"name\\\":\\\"cascader\\\",\\\"type\\\":\\\"string\\\",\\\"link_models\\\":null,\\\"link_field\\\":null,\\\"iterm_type\\\":\\\"Cascader\\\",\\\"enum_list\\\":null}}\"}}"
        }
      ]
      return {
        code: 20000,
        data: {
          count: results.length,
          results: results
        }
      };
    }
  },
  {
    url: "/ops_job/job_order_field/",
    type: "get",
    response: config => {
      const { page, page_size } = config.query;
      const results = [
        {
          id: 10,
          create_time: "2021-02-24 18:39:00",
          update_time: "2021-02-24 18:39:24",
          is_deleted: false,
          name: "cascader",
          type: "string",
          link_models: null,
          link_field: null,
          iterm_type: "Cascader",
          enum_list: null
        },
        {
          id: 8,
          create_time: "2021-02-24 18:38:00",
          update_time: "2021-02-24 18:39:02",
          is_deleted: false,
          name: "checkbox",
          type: "string",
          link_models: null,
          link_field: null,
          iterm_type: "Checkbox",
          enum_list: null
        },
        {
          id: 14,
          create_time: "2021-02-24 18:39:00",
          update_time: "2021-02-24 18:40:22",
          is_deleted: false,
          name: "datepicker",
          type: "string",
          link_models: null,
          link_field: null,
          iterm_type: "DatePicker",
          enum_list: null
        },
        {
          id: 15,
          create_time: "2021-02-24 18:40:00",
          update_time: "2021-02-24 18:40:39",
          is_deleted: false,
          name: "datetimePicker",
          type: "string",
          link_models: null,
          link_field: null,
          iterm_type: "DateTimePicker",
          enum_list: null
        },
        {
          id: 5,
          create_time: "2021-02-24 18:37:00",
          update_time: "2021-02-24 18:38:06",
          is_deleted: false,
          name: "input",
          type: "string",
          link_models: null,
          link_field: null,
          iterm_type: "Input",
          enum_list: null
        },
        {
          id: 20,
          create_time: "2021-02-25 19:26:00",
          update_time: "2021-02-25 19:26:27",
          is_deleted: false,
          name: "input2",
          type: "string",
          link_models: null,
          link_field: null,
          iterm_type: "Input",
          enum_list: "11"
        },
        {
          id: 9,
          create_time: "2021-02-24 18:39:00",
          update_time: "2021-02-24 18:39:13",
          is_deleted: false,
          name: "inputnumber",
          type: "int",
          link_models: null,
          link_field: null,
          iterm_type: "InputNumber",
          enum_list: null
        },
        {
          id: 6,
          create_time: "2021-02-24 18:38:00",
          update_time: "2021-02-25 16:08:33",
          is_deleted: false,
          name: "location",
          type: "string",
          link_models: null,
          link_field: null,
          iterm_type: "Select",
          enum_list: "aaaaaaaa,bbb,ccc"
        },
        {
          id: 1,
          create_time: "2021-02-24 13:59:00",
          update_time: "2021-02-25 19:36:37",
          is_deleted: false,
          name: "name",
          type: "string",
          link_models: "apps.ops_cmdb.models",
          link_field: "Project.name",
          iterm_type: "Select",
          enum_list: ""
        },
        {
          id: 7,
          create_time: "2021-02-24 18:38:00",
          update_time: "2021-02-24 18:38:42",
          is_deleted: false,
          name: "radio",
          type: "bool",
          link_models: null,
          link_field: null,
          iterm_type: "Radio",
          enum_list: null
        }
      ];
      return {
        code: 20000,
        data: {
          count: results.length,
          results: results
        }
      };
    }
  },
  {
    url: "/ops_job/job_order_template/",
    type: "get",
    response: config => {
      const { page, page_size } = config.query;

      const results = [
        {
          id: 43,
          create_time: "2021-03-11 12:15:04",
          update_time: "2021-03-11 12:15:04",
          is_deleted: false,
          name: "31101",
          order_filed:
            '{"location":{"id":6,"create_time":"2021-02-24 18:38:00","update_time":"2021-02-25 16:08:33","is_deleted":false,"name":"location","type":"string","link_models":null,"link_field":null,"iterm_type":"Select","enum_list":"aaaaaaaa,bbb,ccc"}}'
        },
        {
          id: 44,
          create_time: "2021-03-11 12:22:44",
          update_time: "2021-03-11 12:22:44",
          is_deleted: false,
          name: "31102",
          order_filed:
            '{"cascader":{"id":10,"create_time":"2021-02-24 18:39:00","update_time":"2021-02-24 18:39:24","is_deleted":false,"name":"cascader","type":"string","link_models":null,"link_field":null,"iterm_type":"Cascader","enum_list":null}}'
        },
        {
          id: 45,
          create_time: "2021-03-11 12:22:53",
          update_time: "2021-03-11 12:22:53",
          is_deleted: false,
          name: "31103",
          order_filed:
            '{"name":{"id":1,"create_time":"2021-02-24 13:59:00","update_time":"2021-02-25 19:36:37","is_deleted":false,"name":"name","type":"string","link_models":"apps.ops_cmdb.models","link_field":"Project.name","iterm_type":"Select","enum_list":""}}'
        },
        {
          id: 46,
          create_time: "2021-03-11 12:23:01",
          update_time: "2021-03-15 15:09:25",
          is_deleted: false,
          name: "31104",
          order_filed:
            '{"radio":{"id":7,"create_time":"2021-02-24 18:38:00","update_time":"2021-02-24 18:38:42","is_deleted":false,"name":"radio","type":"bool","link_models":null,"link_field":null,"iterm_type":"Radio","enum_list":null},"location":{"id":6,"create_time":"2021-02-24 18:38:00","update_time":"2021-02-25 16:08:33","is_deleted":false,"name":"location","type":"string","link_models":null,"link_field":null,"iterm_type":"Select","enum_list":"aaaaaaaa,bbb,ccc"},"cascader":{"id":10,"create_time":"2021-02-24 18:39:00","update_time":"2021-02-24 18:39:24","is_deleted":false,"name":"cascader","type":"string","link_models":null,"link_field":null,"iterm_type":"Cascader","enum_list":null},"datepicker":{"id":14,"create_time":"2021-02-24 18:39:00","update_time":"2021-02-24 18:40:22","is_deleted":false,"name":"datepicker","type":"string","link_models":null,"link_field":null,"iterm_type":"DatePicker","enum_list":null},"datetimePicker":{"id":15,"create_time":"2021-02-24 18:40:00","update_time":"2021-02-24 18:40:39","is_deleted":false,"name":"datetimePicker","type":"string","link_models":null,"link_field":null,"iterm_type":"DateTimePicker","enum_list":null},"switch":false}'
        },
        {
          id: 47,
          create_time: "2021-03-11 12:23:39",
          update_time: "2021-03-11 12:23:39",
          is_deleted: false,
          name: "31105",
          order_filed:
            '{"location":{"id":6,"create_time":"2021-02-24 18:38:00","update_time":"2021-02-25 16:08:33","is_deleted":false,"name":"location","type":"string","link_models":null,"link_field":null,"iterm_type":"Select","enum_list":"aaaaaaaa,bbb,ccc"}}'
        },
        {
          id: 48,
          create_time: "2021-03-11 12:24:42",
          update_time: "2021-03-11 15:20:22",
          is_deleted: false,
          name: "31106",
          order_filed:
            '{"location":{"id":6,"create_time":"2021-02-24 18:38:00","update_time":"2021-02-25 16:08:33","is_deleted":false,"name":"location","type":"string","link_models":null,"link_field":null,"iterm_type":"Select","enum_list":"aaaaaaaa,bbb,ccc"},"radio":{"id":7,"create_time":"2021-02-24 18:38:00","update_time":"2021-02-24 18:38:42","is_deleted":false,"name":"radio","type":"bool","link_models":null,"link_field":null,"iterm_type":"Radio","enum_list":null},"cascader":{"id":10,"create_time":"2021-02-24 18:39:00","update_time":"2021-02-24 18:39:24","is_deleted":false,"name":"cascader","type":"string","link_models":null,"link_field":null,"iterm_type":"Cascader","enum_list":null}}'
        },
        {
          id: 49,
          create_time: "2021-03-11 12:29:10",
          update_time: "2021-03-11 12:29:10",
          is_deleted: false,
          name: "31107",
          order_filed:
            '{"location":{"id":6,"create_time":"2021-02-24 18:38:00","update_time":"2021-02-25 16:08:33","is_deleted":false,"name":"location","type":"string","link_models":null,"link_field":null,"iterm_type":"Select","enum_list":"aaaaaaaa,bbb,ccc"}}'
        },
        {
          id: 50,
          create_time: "2021-03-11 12:31:57",
          update_time: "2021-03-11 12:31:57",
          is_deleted: false,
          name: "31108",
          order_filed:
            '{"datetimePicker":{"id":15,"create_time":"2021-02-24 18:40:00","update_time":"2021-02-24 18:40:39","is_deleted":false,"name":"datetimePicker","type":"string","link_models":null,"link_field":null,"iterm_type":"DateTimePicker","enum_list":null}}'
        },
        {
          id: 51,
          create_time: "2021-03-11 12:35:02",
          update_time: "2021-03-11 12:35:02",
          is_deleted: false,
          name: "31109",
          order_filed:
            '{"datepicker":{"id":14,"create_time":"2021-02-24 18:39:00","update_time":"2021-02-24 18:40:22","is_deleted":false,"name":"datepicker","type":"string","link_models":null,"link_field":null,"iterm_type":"DatePicker","enum_list":null}}'
        },
        {
          id: 52,
          create_time: "2021-03-11 12:41:29",
          update_time: "2021-03-11 15:10:26",
          is_deleted: false,
          name: "31110",
          order_filed:
            '{"datepicker":{"id":14,"create_time":"2021-02-24 18:39:00","update_time":"2021-02-24 18:40:22","is_deleted":false,"name":"datepicker","type":"string","link_models":null,"link_field":null,"iterm_type":"DatePicker","enum_list":null},"cascader":{"id":10,"create_time":"2021-02-24 18:39:00","update_time":"2021-02-24 18:39:24","is_deleted":false,"name":"cascader","type":"string","link_models":null,"link_field":null,"iterm_type":"Cascader","enum_list":null},"datetimePicker":{"id":15,"create_time":"2021-02-24 18:40:00","update_time":"2021-02-24 18:40:39","is_deleted":false,"name":"datetimePicker","type":"string","link_models":null,"link_field":null,"iterm_type":"DateTimePicker","enum_list":null},"radio":{"id":7,"create_time":"2021-02-24 18:38:00","update_time":"2021-02-24 18:38:42","is_deleted":false,"name":"radio","type":"bool","link_models":null,"link_field":null,"iterm_type":"Radio","enum_list":null}}'
        }
      ];
      return {
        code: 20000,
        data: {
          count: results.length,
          results: results
        }
      };
    }
  }
];
