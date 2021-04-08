<template>
  <div class="project_instance">
    <el-card class="box-card" v-if="!isEdit">
      <!--表头 -->
      <el-input
        placeholder="name"
        style="width: 200px"
        class="filter-item"
        v-model="searchText"
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
        <el-table-column
          label="项目实例名称"
          prop="instance_name"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.instance_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="project" prop="project_data" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.project_data.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="代码仓库类型"
          prop="code_registry_type"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.code_registry_type }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="代码仓库地址"
          prop="code_registry_url"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.code_registry_url }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编译方式" prop="build_method" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.build_method }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开发语言" prop="language" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.language }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主机部署" prop="host_deploy" align="center">
          <template slot-scope="{ row }">
            <el-link
              v-if="row.host_deploy === true"
              icon="el-icon-success"
              type="success"
            ></el-link>
            <el-link v-else icon="el-icon-error" type="danger"></el-link>
          </template>
        </el-table-column>
        <el-table-column label="容器部署" prop="docker_deploy" align="center">
          <template slot-scope="{ row }">
            <el-link
              v-if="row.docker_deploy === true"
              icon="el-icon-success"
              type="success"
            ></el-link>
            <el-link v-else icon="el-icon-error" type="danger"></el-link>
          </template>
        </el-table-column>
        <el-table-column prop="actions" label="操作" align="center" width="100">
          <template slot-scope="{ row,$index }">
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
              @click="handleDelete($index)"
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
        class="pa"
      />
    </el-card>

    <el-card v-else class="edit-card">
      <div class="left-div">
        <el-page-header
          @back="goBack"
          content="创建项目实例"
          class="el-page-header"
        >
        </el-page-header>
        <!--------表单--------->
        <el-form
          ref="dataForm"
          :model="temp"
          label-position="left"
          label-width="2rem"
          class="el-form"
        >
          <el-form-item
            label="项目实例名称"
            prop="instance_name"
            style="width: 350px"
          >
            <el-input v-model="temp.instance_name" placeholder="" />
          </el-form-item>
          <el-form-item label="project" prop="project">
            <el-select
              v-model="temp.project"
              filterable
              remote
              :remote-method="remoteMethod"
              placeholder="🔍   请输入关键词搜索"
              ref="projectSelect"
            >
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-link
              icon="el-icon-circle-plus"
              type="success"
              class="el-link"
              @click="addProject"
            ></el-link>
          </el-form-item>
          <el-form-item
            label="代码仓库类型"
            prop="code_registry_type"
            placeholder="temp.code_registry_type"
          >
            <el-select v-model="temp.code_registry_type">
              <el-option value="git">git</el-option>
              <el-option value="svn">svn</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代码仓库地址" prop="code_registry_url">
            <el-input v-model="temp.code_registry_url" placeholder="" />
          </el-form-item>
          <el-form-item label="编译方式" prop="build_method">
            <el-select v-model="temp.build_method">
              <el-option value="mvn">mvn</el-option>
              <el-option value="npm">npm</el-option>
              <el-option value="dotnet">dotnet</el-option>
              <el-option value="dockerFile">dockerFile</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开发语言" prop="language">
            <el-select v-model="temp.language">
              <el-option value="java">java</el-option>
              <el-option value="dotnet">dotnet</el-option>
              <el-option value="python">python</el-option>
              <el-option value="golang">golang</el-option>
              <el-option value="nodejs">nodejs</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="编译路径" prop="build_path">
            <el-input v-model="temp.build_path" placeholder="" />
          </el-form-item>
          <el-form-item label="部署路径" prop="deploy_path">
            <el-input
              v-model="temp.deploy_path"
              placeholder=""
              style="width: 350"
            />
          </el-form-item>
          <el-form-item label="主机部署" prop="host_deploy">
            <el-radio-group v-model="temp.host_deploy">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="容器部署" prop="docker_deploy">
            <el-radio-group v-model="temp.docker_deploy">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="服务器启动命令"
            prop="start_command"
            style="width: 350px"
          >
            <el-input v-model="temp.start_command" placeholder="" />
          </el-form-item>
          <el-form-item
            label="服务器停止命令"
            prop="stop_command"
            style="width: 350px"
          >
            <el-input v-model="temp.stop_command" placeholder="" />
          </el-form-item>
          <el-form-item
            label="描述"
            prop="describe"
            style="width: 350px; height: 100px"
          >
            <el-input
              style="width: 350px"
              v-model="temp.describe"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 15 }"
            />
          </el-form-item>

          <!-- <el-form-item label="is_deleted" prop="is_deleted" v-if="this.editType != 'create'">
          <el-select :v-model="temp.is_deleted">
            <el-option value="false">false</el-option>
            <el-option value="true">true</el-option>
          </el-select>
        </el-form-item> -->
        </el-form>
        <div class="f-div">
          <el-button @click="cancel"> 取消 </el-button>
          <el-button
            type="primary"
            @click="editType === 'create' ? create() : update()"
          >
            提交
          </el-button>
        </div>
      </div>
      <div class="right-div">
        <div class="n9e-form">
          <div class="n9e-title">n9e关联</div>
          <el-tabs
            type="border-card"
            v-model="n9eActiveName"
            @tab-click="n9eTabsClick"
          >
            <el-tab-pane
              v-for="(item, index) in DeployEnvConfigList"
              :key="index"
              :label="item.name"
              :name="item.id.toString()"
              stretch
            >
              <el-form
                :model="n9eTemp"
                label-position="left"
                label-width="3.5rem"
                class="el-form"
              >
                <el-form-item
                  v-for="(val, keys) in n9eActionPrefixList"
                  :key="keys"
                  :label="val"
                  :prop="val"
                  style="width: 300px"
                >
                  <el-select
                    v-model="n9eTemp[keys]"
                    filterable
                    remote
                    :remote-method="getN9eJobTaskTpl"
                    placeholder="🔍   请输入关键词搜索"
                    style="width: 300px"
                    @focus="selectFocus(keys)"
                  >
                    <el-option
                      v-for="(vv, kk) in N9eJobTaskTplList[keys]"
                      :key="kk"
                      :label="vv.title"
                      :value="vv.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="n9e_ams_host"
                  prop="n9e_ams_host"
                  style="width: 350px"
                >
                  <el-select
                    v-model="n9eTemp.n9e_ams_host"
                    filterable
                    remote
                    multiple
                    :remote-method="getN9eAmsHost"
                    placeholder="🔍   请输入主机ip地址"
                    style="width: 300px"
                  >
                    <el-option
                      v-for="item in N9eAmsHostList"
                      :key="item.id"
                      :label="item.ip"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-button
                type="primary"
                @click="editType === 'create' ? n9eCreate() : n9eUpdate()"
                class="createBtn"
                :disabled="!n9eTemp.instance_name"
              >
                提交
              </el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="wanye-form">
          <div class="wayne-title">wayne关联</div>
          <el-tabs
            type="border-card"
            v-model="wayneActiveName"
            @tab-click="wanyeTabsClick"
          >
            <el-tab-pane
              v-for="(item, index) in DeployEnvConfigList"
              :key="index"
              :label="item.name"
              :name="item.id.toString()"
              stretch
            >
              <el-form
                :model="wayneTemp"
                label-position="left"
                label-width="3rem"
                class="el-form"
              >
                <el-form-item
                  label="Wayne-namespace"
                  prop="Wayne-namespace"
                  style="width: 300px"
                >
                  <el-select
                    v-model="wayneTemp.wayne_namespace"
                    filterable
                    remote
                    :remote-method="getWayneNameSpace"
                    placeholder="🔍   请输入关键词搜索"
                    style="width: 300px"
                    @change="getWayneNameSpaceChange"
                  >
                    <el-option
                      v-for="item in WayneNameSpaceList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      ref="eoption"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="Wayne-app"
                  prop="Wayne-app"
                  style="width: 300px"
                >
                  <el-select
                    v-model="wayneTemp.wayne_app"
                    filterable
                    remote
                    :remote-method="getWayneApp"
                    placeholder="🔍   请输入关键词搜索"
                    style="width: 300px"
                    @change="getWayneAppChange"
                  >
                    <el-option
                      v-for="item in WayneAppList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="Wayne-deployment"
                  prop="Wayne-deployment"
                  style="width: 350px"
                >
                  <el-select
                    v-model="wayneTemp.wayne_deployment"
                    filterable
                    remote
                    :remote-method="getWayneDeployment"
                    placeholder="🔍   请输入关键词搜索"
                    style="width: 300px"
                    @change="getWayneDeploymentChange"
                  >
                    <el-option
                      v-for="item in WayneDeploymentList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-button
                type="primary"
                @click="editType === 'create' ? wayneCreate() : wayneUpdate()"
                class="createBtn"
                :disabled="!wayneTemp.instance_name"
              >
                提交
              </el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>
    <!-- project 添加表单 -->
    <el-dialog title="添加project" :visible.sync="projectVisible" width="90%">
      <el-form
        ref="dataForm"
        :model="projectTemp"
        label-position="left"
        label-width="150px"
        style="margin: 15px 5px"
      >
        <el-form-item label="项目" prop="name" style="width: 350px">
          <el-input v-model="projectTemp.name" placeholder="请输入项目信息" />
        </el-form-item>
        <el-form-item label="产品线" prop="product">
          <el-select
            v-model="projectTemp.product"
            filterable
            remote
            :remote-method="getProduct"
            placeholder="🔍   请输入关键词搜索"
            style="width: 250px"
            ref="productSelect"
          >
            <el-option
              v-for="item in productList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-link
            icon="el-icon-circle-plus"
            type="success"
            class="el-link"
            @click="addProduct"
          ></el-link>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="projectVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProjectElement">确 定</el-button>
      </span>
    </el-dialog>

    <!-- product 表单添加 -->
    <el-dialog
      title="添加product"
      :visible.sync="productVisible"
      width="60%"
      append-to-body
    >
      <el-form
        ref="dataForm"
        :model="productTemp"
        label-position="left"
        label-width="150px"
        style="margin: 15px 5px"
      >
        <el-form-item label="产品线" prop="name" style="width: 350px">
          <el-input v-model="productTemp.name" placeholder="请输入产品线信息" />
        </el-form-item>
        <el-form-item label="organization" prop="organization">
          <el-select
            v-model="productTemp.organization"
            filterable
            remote
            :remote-method="getOrganization"
            placeholder="🔍   请输入关键词搜索"
            style="width: 350px"
            ref="organizationSelect"
          >
            <el-option
              v-for="item in organizationList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-link
            icon="el-icon-circle-plus"
            type="success"
            class="el-link"
            @click="addOrganization"
          ></el-link>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="productVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProductElement">确 定</el-button>
      </span>
    </el-dialog>
    <!-- organization 表单添加 -->
    <el-dialog
      title="添加organization"
      :visible.sync="organizationVisible"
      width="50%"
      append-to-body
    >
      <el-form
        ref="dataForm"
        :model="organizationTemp"
        label-position="left"
        label-width="150px"
        style="margin: 15px 5px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="organizationTemp.name" placeholder="名称" />
        </el-form-item>
        <el-form-item label="上级部门" prop="parent">
          <el-select
            v-model="productTemp.organization"
            filterable
            remote
            :remote-method="getOrganization"
            placeholder="🔍   请输入关键词搜索"
            style="width: 350px"
            ref="organizationSelect"
          >
            <el-option
              v-for="item in organizationList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="organizationVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrganizationElement"
          >确 定</el-button
        >
      </span>
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
  getProjectInstance,
  getProjectInstanceDetailById,
  addProjectInstance,
  updateProjectInstance,
  getProject,
  addProject,
  delProjectInstance,
  getProduct,
  addProduct,
  getOrganization,
  getWayneProjectInstance,
  addWayneProjectInstance,
  updateWayneProjectInstance,
  getN9eJobTaskTpl,
  getN9eAmsHost,
  getDeployEnv,
  getWayneNamespace,
  getN9eHostByEnv,
  getN9eTplByEnv,
  getWayneAppByNamespaceId,
  addHostProjectInstance,
  getHostProjectInstanceDetailById,
  getWayneDeploymentByAppId,
  getWayneProjectInstanceByInstanceId,
} from "@/api/cmdb";
import { createOrg } from "@/api/org";

import { getDeployEnvConfig } from "@/api/system";
import Dialog from "@/components/Dialog";
import Pagination from "@/components/Pagination";

export default {
  name: "computer_room",
  components: { Dialog, Pagination },
  data() {
    return {
      projectVisible: false,
      productVisible: false,
      organizationVisible: false,
      delDialogVisible: false,
      n9eActiveName: "1",
      wayneActiveName: "1",
      isEdit: false,
      textMap: {
        create: "创建",
        update: "更新",
      },
      editType: "",
      //request
      searchText: "",
      aaa: "",
      delItem: {
        id: 0,
        index: 0,
      },
      projectTemp: {
        name: "",
        product: "",
      },
      productTemp: {
        name: "",
        organization: "",
      },
      organizationTemp: {
        name: "",
        parent: "",
      },
      n9eTemp: {
        id: "",
        instance_name: "",
        deploy_env: 1,
        n9e_job_task_tpl: "",
        n9e_ams_host: [],
      },
      wayneTemp: {
        id: "",
        instance_name: "",
        deploy_env: 1,
        wayne_namespace: "",
        wayne_app: "",
        wayne_deployment: "",
        project: "",
      },
      temp: {
        id: "",
        instance_name: "",
        project: "",
        code_registry_type: "git",
        code_registry_url: "",
        build_method: "mvn",
        language: "java",
        build_path: "/",
        deploy_path: "/",
        host_deploy: "",
        docker_deploy: "",
        start_command: "",
        stop_command: "",
        describe: "",
      },
      listQuery: {
        page: 1,
        page_size: 10,
        search: "",
        ordering: "id",
      },
      appDeployQuery: {
        app_id: null,
        namespace_id: null,
        search: "",
        page: 1,
        page_size: 10,
      },
      wayneProjectInstanceQuery: {
        instance_id: 0,
        deploy_env_name: "dev",
        page: 1,
        page_size: 10,
      },
      n9eListQuery: {
        env_id: 1,
        action_prefix: "",
        search: "",
      },
      n9eActionPrefixList: {
        upgrade: "upgrade_n9e_job_task_tpl",
        rollback: "rollback_n9e_job_task_tpl",
        deploy: "deploy_n9e_job_task_tpl",
        remove: "remove_n9e_job_task_tpl",
        manager: "manager_n9e_job_task_tpl",
      },
      //response
      TableList: [],
      TableTitleList: [],
      total: 0,
      projectList: [],
      productList: [],
      organizationList: [],
      DeployEnvConfigList: [],
      WayneNameSpaceList: [],
      WayneDeploymentList: [],
      WayneAppList: [],
      N9eJobTaskTplList: {},
      N9eAmsHostList: [],
    };
  },
  mounted() {
    this.getTableList();
    // getDeployEnvConfig(this.listQuery).then((res) => {
    //   this.DeployEnvConfigList = res.data.results;
    // });
  },
  watch: {
    searchText(newVal, oldVal) {
      if (newVal === "") {
        this.getTableList();
      }
    },
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.is_deleted == true) {
        return "is_deleted";
      } else {
        return "";
      }
    },
    //防抖函数，搜索栏500ms未输入信息调api接口
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        page_size: 10,
        search: "",
        ordering: "id",
      };
    },
    remoteMethod(text) {
      this.resetListQuery();
      this.listQuery.search = text;
      // this.debounce(this.getServiceProviderList,500)
      this.getProjectListList();
    },
    getProjectListList() {
      getProject(this.listQuery).then((res) => {
        this.projectList = res.data.results;
      });
    },
    getProduct(text) {
      this.resetListQuery();
      this.listQuery.search = text;
      this.getProductList();
    },
    getProductList() {
      getProduct(this.listQuery).then((res) => {
        this.productList = res.data.results;
      });
    },
    getOrganization(text) {
      this.resetListQuery();
      this.listQuery.search = text;
      this.getOrganizationList();
    },
    getOrganizationList() {
      getOrganization(this.listQuery).then((res) => {
        this.organizationList = res.data;
      });
    },
    getWayneNameSpace(text) {
      this.resetListQuery();
      this.listQuery.search = text;
      getWayneNamespace(this.listQuery).then((res) => {
        this.WayneNameSpaceList = res.data.results;
      });
    },
    getWayneNameSpaceChange(val) {
      let wns = this.WayneNameSpaceList.filter((d) => {
        return d.id === val;
      });
      this.listQuery.search = wns[0].name;
      getWayneNamespace(this.listQuery).then((res) => {
        this.WayneNameSpaceList = res.data.results;
      });
    },
    getWayneAppChange(val) {
      let wa = this.WayneAppList.filter((d) => {
        return d.id === val;
      });
      this.appDeployQuery.search = wa[0].name;
      getWayneAppByNamespaceId(this.appDeployQuery).then((res) => {
        this.WayneAppList = res.data.results;
      });
    },
    getWayneDeploymentChange(val) {
      let wdm = this.WayneDeploymentList.filter((d) => {
        return d.id === val;
      });
      this.appDeployQuery.search = wdm[0].name;
      getWayneDeploymentByAppId(this.appDeployQuery).then((res) => {
        this.WayneDeploymentList = res.data.results;
      });
    },
    getWayneApp(text) {
      this.appDeployQuery.search = text;
      this.appDeployQuery.namespace_id = this.wayneTemp.wayne_namespace;
      getWayneAppByNamespaceId(this.appDeployQuery).then((res) => {
        this.WayneAppList = res.data.results;
      });
    },
    getWayneDeployment(text) {
      this.appDeployQuery.search = text;
      this.appDeployQuery.app_id = this.wayneTemp.wayne_app;
      getWayneDeploymentByAppId(this.appDeployQuery).then((res) => {
        this.WayneDeploymentList = res.data.results;
      });
    },
    getN9eJobTaskTpl(text) {
      this.n9eListQuery.search = text;
      getN9eTplByEnv(this.n9eListQuery).then((res) => {
        this.$set(
          this.N9eJobTaskTplList,
          this.n9eListQuery.action_prefix,
          res.data.results
        );
      });
    },
    selectFocus(event) {
      this.n9eListQuery.action_prefix = event;
    },
    getN9eAmsHost(text) {
      this.n9eListQuery.search = text;
      getN9eHostByEnv(this.n9eListQuery).then((res) => {
        this.N9eAmsHostList = res.data.results;
      });
    },
    getTableList() {
      this.listQuery.search = "";
      getProjectInstance(this.listQuery).then((res) => {
        this.TableList = res.data.results;
        this.total = res.data.count;
      });
    },
    //tabs 切换回调
    n9eTabsClick(tab) {
      this.resetN9eTemp();
      this.n9eListQuery.env_id = tab.name;
      this.n9eTemp.deploy_env = parseInt(tab.name);
    },
    wanyeTabsClick(tab) {
      this.resetWayneTemp();
      this.wayneTemp.deploy_env = parseInt(tab.name);
      this.wayneProjectInstanceQuery.deploy_env_name = tab.label;
      if (this.editType === "update") {
        this.getWanyProjectInstanceByInstanceIdFun(this.temp.id);
      }
    },
    //搜索按钮回调
    handleSearch() {
      this.listQuery.search = this.searchText;
      getProjectInstance(this.listQuery).then((res) => {
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
        instance_name: "",
        project: "",
        code_registry_type: "git",
        code_registry_url: "",
        build_method: "mvn",
        language: "java",
        build_path: "/",
        deploy_path: "/",
        host_deploy: "",
        docker_deploy: "",
        start_command: "",
        stop_command: "",
        describe: "",
      };
    },
    resetWayneTemp() {
      this.wayneTemp = {
        id: "",
        instance_name: "",
        deploy_env: 1,
        wayne_namespace: "",
        wayne_app: "",
        wayne_deployment: "",
        project: "",
      };
    },
    resetN9eTemp() {
      this.n9eTemp = {
        id: "",
        instance_name: "",
        deploy_env: 1,
        n9e_job_task_tpl: "",
        n9e_ams_host: [],
      };
    },
    //创建回调
    handleCreate() {
      this.resetTemp();
      this.resetWayneTemp();
      this.resetN9eTemp();
      this.isEdit = true;
      this.editType = "create";
    },
    //表单里添加project
    addProject() {
      this.projectVisible = true;
    },
    addProjectElement() {
      addProject(this.projectTemp).then(() => {
        this.projectVisible = false;
        this.$refs.projectSelect.focus();
      });
    },
    addProduct() {
      this.productVisible = true;
    },
    addProductElement() {
      addProduct(this.productTemp).then(() => {
        this.productVisible = false;
        this.$refs.productSelect.focus();
      });
    },
    addOrganization() {
      this.organizationVisible = true;
    },
    addOrganizationElement() {
      createOrg(this.organizationTemp).then(() => {
        this.organizationVisible = false;
        this.$refs.organizationSelect.focus();
      });
    },
    //reset  WayneList
    resetWayneList() {
      this.WayneNameSpaceList = [];
      this.WayneDeploymentList = [];
      this.WayneAppList = [];
      this.projectList = [];
    },
    //编辑回调
    edit(row) {
      this.isEdit = true;
      this.editType = "update";
      this.resetTemp();
      this.resetWayneTemp();
      this.resetN9eTemp();
      // getProjectInstanceDetailById(row.id).then((res) => {
      //   this.temp = res.data;
      //   this.projectList.push(res.data.project_data);
      //   this.getWanyProjectInstanceByInstanceIdFun(row.id);
      //   // this.getHostProjectInstanceDetailByIdFun(row.id);
      // });
    },
    getWanyProjectInstanceByInstanceIdFun(id) {
      this.wayneProjectInstanceQuery.instance_id = id;
      this.wayneTemp.instance_name = id;
      getWayneProjectInstanceByInstanceId(this.wayneProjectInstanceQuery).then(
        (res) => {
          if (res.data.results[0]) {
            this.wayneTemp.id = res.data.results[0].id;
            this.wayneTemp.instance_name = res.data.results[0].instance_name;
            this.wayneTemp.deploy_env = res.data.results[0].deploy_env;
            this.wayneTemp.wayne_namespace =
              res.data.results[0].wayne_namespace;
            this.wayneTemp.wayne_app = res.data.results[0].wayne_app;
            this.wayneTemp.wayne_deployment =
              res.data.results[0].wayne_deployment;
            this.wayneTemp.project = this.temp.project;
            this.resetWayneList();
            this.WayneNameSpaceList.push(
              res.data.results[0].wayne_namespace_data
            );
            this.WayneDeploymentList.push(
              res.data.results[0].wayne_deployment_data
            );
            this.WayneAppList.push(res.data.results[0].wayne_app_data);
          }
        }
      );
    },
    getHostProjectInstanceDetailByIdFun(id) {
      getHostProjectInstanceDetailById(id).then((res) => {
        console.log("aaaaaaa", res);
      });
    },
    create() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          addProjectInstance(this.temp).then((res) => {
            this.wayneTemp.project = res.data.project;
            this.wayneTemp.instance_name = res.data.id;
            this.n9eTemp.instance_name = res.data.id;
            // this.isEdit = false;
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
    n9eCreate() {
      // addHostProjectInstance(this.n9eTemp).then();
    },
    wayneCreate() {
      addWayneProjectInstance(this.wayneTemp).then((res) => {
        this.$notify({
          title: "success",
          message: "添加成功",
          type: "success",
          duration: 2000,
        });
      });
    },
    update() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          updateProjectInstance(this.temp.id, this.temp).then(() => {
            // this.isEdit = false;
            // this.getTableList();
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
    n9eUpdate() {},
    wayneUpdate() {
      if (this.wayneTemp.id) {
        updateWayneProjectInstance(this.wayneTemp.id, this.wayneTemp).then();
      } else {
        this.wayneTemp.project = this.temp.project;
        this.wayneTemp.instance_name = this.temp.id;
        addWayneProjectInstance(this.wayneTemp).then();
      }
    },
    //删除按钮回调
    handleDelete(index) {
      this.delDialogVisible = true;
      this.delItem.index = index;
    },
    dialogDelete() {
      // delProjectInstance(this.delItem.id).then(() => {
        this.TableList.splice(this.delItem.index,1)
        this.delDialogVisible = false;
        // this.getTableList();
        this.$notify({
          title: "success",
          message: "删除成功",
          type: "success",
          duration: 2000,
        });
      // });
    },
    cancel() {
      this.getTableList();
      this.isEdit = false;
    },
    goBack() {
      this.getTableList();
      this.isEdit = false;
    },
  },
};
</script>
    
<style>
.project_instance {
  width: 100%;
}
.box-card,
.edit-card {
  width: 97%;
  height: 88vh;
  margin: 25px;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}
.edit-card .el-card__body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}
.el-page-header__title {
  font-size: 20px;
}
.el-table {
  margin-top: 15px;
}
.el-search {
  margin-left: 5px;
}
.el-form {
  margin: 25px 5px 0px;
}
.el-form .el-form-item {
  height: 0.65rem;
}
.left-div {
  width: 50%;
  padding: 15px;
  position: relative;
  border: 1px solid olivedrab;
  border-radius: 5px;
}
.right-div {
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.n9e-form {
  position: relative;
  width: 100%;
  height: 45%;
  border: 1px solid skyblue;
  border-radius: 5px;
}
.n9e-title {
  background-color: skyblue;
  font-family: Helvetica, sans-serif;
  font-size: 0.7rem;
}
.wayne-title {
  background-color: greenyellow;
  font-family: Helvetica, sans-serif;
  font-size: 0.7rem;
}
.wanye-form {
  position: relative;
  margin-top: 25px;
  width: 100%;
  height: 45%;
  border: 1px solid greenyellow;
  border-radius: 5px;
}
.createBtn {
  position: relative;
  float: right;
}
.el-table .is_deleted {
  color: #c0c4cc;
}
.pa {
  margin-top: 5px;
  height: 35px;
}
.f-div {
  position: relative;
  margin-top: 5px;
  float: right;
}
</style>