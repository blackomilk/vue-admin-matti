<template>
  <div class="">
    <el-card class="box-card">
      <!--表头 -->
      <el-input
        placeholder="name"
        style="width: 200px"
        class="filter-item"
        v-model="searchText"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="el-search"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch"
      >
        Search
      </el-button>

      <!--table 部分 -->
      <el-table
        style="width: 100%"
        :data="TableList"
        fit
        stripe
        class="el-table"
        :row-class-name="tableRowClassName"
        :row-style="{ height: '65px' }"
      >
        <el-table-column label="id" prop="id" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务ID" prop="task_id" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.task_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上线单ID" prop="form_id" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.form_id }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="任务元数据"
          prop="mata_data"
          align="center"
          width="850"
        >
          <template slot-scope="{ row }">
            <div
              class="tag-div"
              v-for="(val, key) in JSON.parse(row.mata_data)"
              :key="key"
            >
              <el-tag>{{ key }}:{{ val }}</el-tag>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          label="Celery任务ID"
          prop="celery_task_id"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.celery_task_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务状态" prop="code" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.code }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="任务返回结果" prop="task_id" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.task_id }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="is_deleted" prop="is_deleted" align="center">
          <template slot-scope="{ row }">
            <el-tooltip
              effect="dark"
              content="点击修改该条信息状态"
              placement="right"
              ><el-tag
                :type="row.is_deleted === true ? 'info' : ''"
                @click="chageStatus(row)"
                style="cursor: pointer"
                >{{ row.is_deleted }}</el-tag
              ></el-tooltip
            >
          </template>
        </el-table-column> -->
        <el-table-column prop="actions" label="操作" align="center" width="100">
          <template slot-scope="{ row }">
            <el-button
              icon="el-icon-view"
              plain
              size="mini"
              type="success"
              style="margin: 10px; width: 75px"
              @click="check(row)"
              >check</el-button
            >

            <el-button
              icon="el-icon-refresh-left"
              plain
              size="mini"
              type="danger"
              style="margin: 10px; width: 75px"
              @click="handleReset(row.mata_data)"
              >reset</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.page_size"
        @pagination="getTableList"
        class="pagination"
      />
    </el-card>
    <!--------表单--------->
    <el-dialog
      title="查看任务详情"
      :visible.sync="dialogVisible"
      fullscreen
      class="dialog"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="150px"
        style="margin: 15px 5px"
      >
        <el-form-item label="任务ID" prop="task_id" style="width: 250px">
          <el-input v-model="temp.task_id" />
        </el-form-item>
        <el-form-item label="上线单ID" prop="form_id" style="width: 250px">
          <el-input v-model="temp.form_id" />
        </el-form-item>
        <el-form-item
          label="Celery任务ID"
          prop="celery_task_id"
          style="width: 550px"
        >
          <el-input v-model="temp.celery_task_id" />
        </el-form-item>
        <el-form-item label="任务状态" prop="code" style="width: 250px">
          <el-input v-model="temp.code" />
        </el-form-item>
        <el-form-item
          label="任务元数据"
          prop="mata_data"
          style="width: 250px;height: auto"
        >
          <div style="height: auto">
            <json-editor
              ref="jsonEditer"
              v-model="mata_data"
              style="width: 750px"
            />
          </div>
        </el-form-item>
        <el-form-item label="任务返回结果" prop="result" style="width: 350px">
          <div class="result">{{ resultss }}</div>
          <!-- <el-input
            type="textarea"
            :rows="10"
            v-model="resultss"
            style="width: 750px"
            class="result-input"
          /> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel"> 取消 </el-button>
        <el-button type="primary" @click="check"> 确认 </el-button>
      </div>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="reset" :visible.sync="resetDialogVisible" width="30%">
      <span>确认reset这条数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogReset">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSmartFormTask,
  getSmartFormTaskDetailById,
  resetHandleIspatcher
} from "@/api/agent";
import Pagination from "@/components/Pagination";
import JsonEditor from "@/components/JsonEditor";

export default {
  name: "smart_form_task",
  components: { Pagination, JsonEditor },

  data() {
    return {
      dialogVisible: false,
      resetDialogVisible: false,
      textMap: {
        create: "创建",
        update: "更新"
      },
      editType: "",

      //request
      searchText: "",
      mata_data: {},
      listQuery: {
        page: 1,
        page_size: 10,
        search: ""
      },
      temp: {
        id: "",
        celery_task_id: "",
        code: "",
        form_id: "",
        mata_data: "",
        result: "",
        task_id: ""
      },
      mata_data: {},
      resultss: null,
      //response
      TableList: [],
      total: 0,
      a: {}
    };
  },
  mounted() {
    this.getTableList();
  },
  computed: {
    mataDataFilteredJSON: {
      get() {
        return this.temp.mata_data;
      },
      set(val) {}
    }
  },
  watch: {
    searchText(newVal, oldVal) {
      if (newVal === "") {
        this.getTableList();
      }
    }
  },
  methods: {
    filterVal(a) {
      let val = JSON.parse(a);
      let aa = {};
      for (let key in val) {
        let item = val[key];
        if (item.substring(0, 1) === "{") {
          let tt = JSON.parse(item);
          let ee = { ...tt };
          aa = Object.assign(val, ee);
          // delete key;
          this.a = aa;
        }
      }
    },
    tableRowClassName({ row }) {
      if (row.is_deleted == true) {
        return "is_deleted";
      } else {
        return "";
      }
    },
    getTableList() {
      this.listQuery.search = "";
      getSmartFormTask(this.listQuery).then(res => {
        console.log(res.data.results);
        this.TableList = res.data.results;
        this.total = res.data.count;
      });
    },
    //搜索按钮回调
    handleSearch() {
      this.listQuery.search = this.searchText;
      getSmartFormTask(this.listQuery).then(res => {
        if (res.data) {
          this.TableList = res.data.results;
          this.total = res.data.count;
        } else {
          this.$message.error("没有相关数据");
        }
      });
    },
    resetTemp() {
      this.temp = {
        id: "",
        name: "",
        location: "",
        is_deleted: false,
        service_provider: ""
      };
    },
    //创建回调
    handleCreate() {
      this.resetTemp();
      this.dialogVisible = true;
      this.editType = "create";
    },
    //编辑回调
    check(row) {
      getSmartFormTaskDetailById(row.id).then(res => {
        this.temp = res.data;
        console.log("asasaaa", res);
        this.formatMataData(res.data.mata_data);
        this.formatResult(res.data.result);
      });
      this.dialogVisible = true;
    },
    formatResult(result) {
      if (result) {
        if (result.indexOf("↵") >= 0) {
          let results = result.replace("↵", "/n");
          this.resultss = results;
        } else {
          this.resultss = result;
        }
      }
    },
    formatMataData(data) {
      let d = JSON.parse(data);
      let ds = {};
      let kd = {};

      if (d instanceof Array) {
        for (let i = 0; i < d.length; i++) {
          ds[i] = d[i];
        }
        for (let kk in ds) {
          for (let kkk in ds[kk]) {
            if (ds[kk][kkk].indexOf("{") != -1) {
              kd[kkk] = JSON.parse(ds[kk][kkk]);
            }
          }
          Object.assign(ds[kk], kd);
        }
        this.mata_data = ds;
      } else {
        for (let k in d) {
          if (d[k].indexOf("{") != -1) {
            kd[k] = JSON.parse(d[k]);
          }
        }
        Object.assign(d, kd);
        this.mata_data = d;
      }
    },
    //reset按钮回调
    handleReset(mata_data) {
      this.resetDialogVisible = true;
      this.mata_data = mata_data;
    },
    dialogReset() {
      this.resetDialogVisible = false;

      // resetHandleIspatcher(this.mata_data).then(res => {
      //   this.getTableList();
      // });
    },
    cancel() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
.ops-cmdb {
}
.el-table {
  margin-top: 20px;
}
.el-search {
  margin-left: 5px;
}
.box-card {
  margin: 20px 30px;
  padding: 25px 25px 15px;
}
.tag-div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.foo {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
}
.el-table .is_deleted {
  color: #c0c4cc;
}
.pagination {
  margin-top: 15px;
}
.el-link {
  margin-left: 15px;
}
.dialog {
  padding: 50px 100px;
}
.result {
  width: 750px;
  height: 300px;
  background-color: #000;
  color: rgba(21, 255, 0, 1);
  overflow: auto;
  padding: 10px;
}
</style>
