<template>
  <div class="">
    <el-card class="box-card">
      <!--表头 -->
      <el-input
        placeholder="name"
        style="width: 200px"
        class="filter-item"
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
      <el-button
        class="filter-item"
        style="margin-left: 5px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        Add
      </el-button>

      <!--table 部分 -->
      <el-table
        style="width: 100%"
        :data="TableList"
        fit
        class="el-table"
        :row-class-name="tableRowClassName"
        :row-style="{ height: '65px' }"
      >
        <el-table-column label="用户名称" prop="username" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="type" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="调用方式" prop="method" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.method }}</span>
          </template>
        </el-table-column>
        <el-table-column label="源数据" prop="meta_data" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.meta_data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务数据" prop="job_data" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.job_data }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="N9e任务ID"
          prop="n9e_job_task_meta_id"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.n9e_job_task_meta_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="N9e任务模板ID"
          prop="n9e_task_tpl_id"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.n9e_task_tpl_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务状态" prop="status" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Stdout" prop="stdout" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.stdout }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Stderr" prop="stderr" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.stderr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="N9e任务状态" prop="n9e_status" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.n9e_status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工单号" prop="order_number_data" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.order_number_data.name }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="actions" label="操作" align="center" width="100">
          <template slot-scope="{ row }">
            <el-button
              icon="el-icon-edit"
              circle
              size="mini"
              @click="edit(row)"
            />
            <el-button
              icon="el-icon-delete"
              circle
              size="mini"
              @click="handleDelete(row.id)"
            />
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
    <el-dialog :title="this.textMap[editType]" :visible.sync="dialogVisible" fullscreen class="dialog">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="150px"
        style="margin: 15px 5px"
      >
        <el-form-item
          label="id"
          prop="id"
          style="width: 350px"
          v-if="this.editType != 'create'"
        >
          <el-input v-model="temp.id" />
        </el-form-item>
        <el-form-item label="用户名称" style="width: 350px" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="类型" style="width: 350px" prop="type">
          <el-input v-model="temp.type" />
        </el-form-item>
        <el-form-item label="调用方式" style="width: 350px" prop="method">
          <el-input v-model="temp.method" />
        </el-form-item>
        <el-form-item label="源数据" style="width: 350px" prop="meta_data">
          <el-input
            v-model="temp.meta_data"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 15 }"
            style="width: 500px"
          />
        </el-form-item>
        <el-form-item label="任务数据" style="width: 350px" prop="job_data">
          <el-input
            v-model="temp.job_data"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 15 }"
            style="width: 500px"
          />
        </el-form-item>
        <el-form-item
          label="N9e任务ID"
          style="width: 350px"
          prop="n9e_job_task_meta_id"
        >
          <el-input v-model="temp.n9e_job_task_meta_id" />
        </el-form-item>
        <el-form-item
          label="N9e任务模板ID"
          style="width: 350px"
          prop="n9e_task_tpl_id"
        >
          <el-input v-model="temp.n9e_task_tpl_id" />
        </el-form-item>
        <el-form-item label="任务状态" style="width: 350px" prop="status">
          <el-input v-model="temp.status" />
        </el-form-item>
        <el-form-item label="Stdout" style="width: 350px" prop="stdout">
          <el-input v-model="temp.stdout" />
        </el-form-item>
        <el-form-item label="Stderr" style="width: 350px" prop="stderr">
          <el-input v-model="temp.stderr" />
        </el-form-item>
        <el-form-item
          label="N9e任务状态"
          style="width: 350px"
          prop="n9e_status"
        >
          <el-input v-model="temp.n9e_status" />
        </el-form-item>
        <el-form-item
          label="工单号"
          style="width: 350px"
          prop="order_number_data"
        >
          <el-input v-model="temp.order_number_data" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel"> 取消 </el-button>
        <el-button
          type="primary"
          @click="editType === 'create' ? create() : update()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除" :visible.sync="delDialogVisible" width="30%">
      <span>确认删除这条数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getN9eJobHistory,
  getN9eJobHistoryDetailById,
  addN9eJobHistory,
  updateN9eJobHistory,
  delN9eJobHistory,
} from "@/api/cmdb";
import Dialog from "@/components/Dialog";
import Pagination from "@/components/Pagination";

export default {
  name: "deploy_env",
  components: { Dialog, Pagination },
  data() {
    return {
      dialogVisible: false,
      delDialogVisible: false,
      textMap: {
        create: "创建",
        update: "更新",
      },
      editType: "",
      //request
      delItem: {
        id: 0,
        index: 0,
      },
      temp: {
        id: "",
        username: "",
        type: "",
        method: "",
        meta_data: "",
        job_data: "",
        n9e_job_task_meta_id: "",
        n9e_task_tpl_id: "",
        status: "",
        stdout: "",
        stderr: "",
        n9e_status: "",
        order_number: "",
      },
      listQuery: {
        page: 1,
        page_size: 10,
      },
      //response
      TableList: [],
      TableTitleList: [],
      total: 0,
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.is_deleted == true) {
        return "is_deleted";
      } else {
        return "";
      }
    },
    getTableList() {
      getN9eJobHistory(this.listQuery).then((res) => {
        console.log("sdadasdasdasdadasdsadas", res);
        this.TableList = res.data.results;
        this.total = res.data.count;
      });
    },
    //搜索按钮回调
    handleSearch() {
      console.log("点击搜索按钮");
    },
    resetTemp() {
      this.temp = {
        id: "",
        name: "",
        wayne_env_name: "",
        registry_env_name: "",
        describe: "",
        is_deleted: false,
      };
    },
    //创建回调
    handleCreate() {
      this.resetTemp();
      this.dialogVisible = true;
      this.editType = "create";
    },
    //编辑回调
    edit(row) {
      getN9eJobHistoryDetailById(row.id).then((res) => {
        this.temp = res.data;
      });
      this.dialogVisible = true;
      this.editType = "update";
    },
    create() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          addN9eJobHistory(this.temp).then(() => {
            this.dialogVisible = false;
            this.getTableList();
            this.$notify({
              title: "success",
              message: "添加成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    update() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          updateN9eJobHistory(this.temp.id, this.temp).then(() => {
            this.dialogVisible = false;
            this.getTableList();
            this.$notify({
              title: "success",
              message: "添加成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    //删除按钮回调
    handleDelete(id) {
      this.delDialogVisible = true;
      this.delItem.id = id;
    },
    dialogDelete() {
      delN9eJobHistory(this.delItem.id).then(() => {
        this.delDialogVisible = false;
        this.getTableList();
        this.$notify({
          title: "success",
          message: "删除成功",
          type: "success",
          duration: 2000,
        });
      });
    },
    cancel() {
      this.dialogVisible = false;
    },
  },
};
</script>
    
<style >
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
.dialog {
  padding: 50px 350px;
}
</style>