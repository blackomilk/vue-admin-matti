<template>
  <div class="ops-job-createJob">
    <div class="box-cardd" v-if="!isEdit">
      <!--表头 -->
      <el-input
        placeholder="name"
        style="width: 200px"
        class="filter-item"
        v-model="orderNumberSearchText"
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
        type="primary"
        icon="el-icon-edit"
        @click="goEditPage"
      >
        创建新任务
      </el-button>
      <div class="job">
        <div class="job-item">
          <div class="no-job" v-if="!JobOrderTableList.length">暂无任务</div>

          <el-timeline style="margin-top: 25px" v-else>
            <el-timeline-item
              v-for="(item, index) in JobOrderTableList"
              :key="index"
              :timestamp="`任务工单号：${item.order_number}`"
              placement="top"
            >
              <div class="el-timeline-i" @click.stop="handleJob(item)">
                <div class="template-name">
                  <!-- <draggable
                  class="zDraggable"
                  group="zGroup"
                  v-model="JobOrderTableList"
                > -->
                  <div
                    v-for="(val, key) in JSON.parse(item.mate_data)"
                    :key="key"
                  >
                    任务模板: {{ key }}
                  </div>
                  <!-- </draggable> -->
                </div>

                <div class="active">
                  <el-button
                    icon="el-icon-plus"
                    round
                    size="mini"
                    @click.stop="updateJobOrderByOrderNumber(item)"
                    >添加任务</el-button
                  >
                  <el-popconfirm
                    title="确定删除吗"
                    @onConfirm="delJobOrderByOrderNumber(item.id)"
                    icon="el-icon-info"
                    icon-color="red"
                    style="margin-top: 15px"
                  >
                    <el-button
                      slot="reference"
                      icon="el-icon-delete"
                      round
                      size="mini"
                      @click.stop=""
                      >删除任务组</el-button
                    >
                  </el-popconfirm>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
          <!--table 部分 -->
          <!-- <el-table
              style="width: 100%"
              :data="JobOrderTableList"
              fit
              stripe
              class="el-table"
              :row-style="{ height: '65px' }"
            >
              <el-table-column label="机房名称" prop="name" align="center">
                <template slot-scope="{ row }">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>
            </el-table> -->
        </div>
      </div>

      <el-dialog
        title="编辑这条任务"
        destroy-on-close
        :visible.sync="jobDialogVisible"
        width="65%"
        top="5vh"
      >
        <el-form
          ref="jobUpdateForm"
          :model="jobTemplateUpdateTemp"
          label-position="left"
          label-width="150px"
          class="update-form"
        >
          <draggable
            class="jobDraggable"
            group="jobGroup"
            v-model="templateUpdateList"
            :scroll="true"
            chosenClass="chosenn"
            @change="handleRemove"
          >
            <div v-for="(iii, nnn) in templateUpdateList" :key="nnn">
              <div class="job-item-card">
                <div>
                  <div class="templateTitle">
                    <el-tag effect="dark">任务模板:</el-tag>
                    <el-tag>{{ iii[0] }}</el-tag>
                  </div>
                  <div
                    v-for="(vvv, kkk) in JSON.parse(iii[1].order_filed)"
                    :key="kkk"
                  >
                    <!-- <div>{{iii[1].order_filed}}</div> -->
                    <!-- <div v-for="(vvv,kkk) in iiii" :key="kkk"> -->
                    <el-form-item
                      :label="kkk"
                      :prop="kkk"
                      v-if="vvv.iterm_type === 'Input'"
                      class="el-form-item"
                    >
                      <el-input
                        style="width: 350px"
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 5 }"
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                        placeholder="请输入内容"
                      />
                    </el-form-item>
                    <!-- Radio -->
                    <el-form-item
                      :label="kkk"
                      :prop="kkk"
                      v-if="vvv.iterm_type === 'Radio'"
                      class="el-form-item"
                    >
                      <el-radio
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                        lable="true"
                        >是</el-radio
                      >
                      <el-radio
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                        label="false"
                        >否</el-radio
                      >
                    </el-form-item>
                    <!-- Checkbox -->
                    <el-form-item
                      :label="kkk"
                      :prop="kkk"
                      v-if="vvv.iterm_type === 'Checkbox'"
                      class="el-form-item"
                    >
                      <el-checkbox
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                        >未定义</el-checkbox
                      >
                    </el-form-item>
                    <!-- InputNumber -->
                    <el-form-item
                      :label="kkk"
                      :prop="kkk"
                      v-if="vvv.iterm_type === 'InputNumber'"
                      class="el-form-item"
                    >
                      <el-input-number
                        :min="1"
                        :max="10"
                        label="描述文字"
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                      ></el-input-number>
                    </el-form-item>
                    <!-- Select -->
                    <el-form-item
                      :label="kkk"
                      :prop="kkk"
                      v-if="vvv.iterm_type === 'Select'"
                      class="el-form-item"
                    >
                      <el-select
                        v-if="!vvv.enum_list"
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                        :filterable="
                          vvv.link_field != null && vvv.link_models != null
                        "
                        :remote="
                          vvv.link_field != null && vvv.link_models != null
                        "
                        :remote-method="remoteMethod"
                        :placeholder="
                          vvv.link_field != null && vvv.link_models != null
                            ? '🔍   请输入关键词搜索'
                            : ''
                        "
                        style="width: 250px"
                      >
                        <template
                          ><el-option
                            v-for="a in filedDataList"
                            :key="a.id"
                            :label="a.name || a.image_name"
                            :value="a.id"
                          ></el-option
                        ></template>
                      </el-select>
                      <el-select
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                        placeholder="请选择"
                        v-else
                      >
                        <template>
                          <el-option
                            v-for="i in vvv.enum_list.split(',')"
                            :key="i"
                            :label="i"
                            :value="i"
                          >
                          </el-option>
                        </template>
                      </el-select>
                    </el-form-item>
                    <!-- Cascader -->
                    <el-form-item
                      :label="kkk"
                      :prop="kkk"
                      v-if="vvv.iterm_type === 'Cascader'"
                      class="el-form-item"
                    >
                      <el-cascader
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                      ></el-cascader>
                    </el-form-item>
                    <!-- Switch -->
                    <el-form-item
                      :label="kkk"
                      :prop="kkk"
                      v-if="vvv.iterm_type === 'Switch'"
                      class="el-form-item"
                    >
                      <el-switch
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      >
                      </el-switch>
                    </el-form-item>
                    <!-- Slider -->
                    <el-form-item
                      :label="kkk"
                      :prop="kkk"
                      v-if="vvv.iterm_type === 'Slider'"
                      class="el-form-item"
                    >
                      <el-slider
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                      ></el-slider>
                    </el-form-item>
                    <!-- TimePicker -->
                    <el-form-item
                      :label="kkk"
                      :prop="kkk"
                      v-if="vvv.iterm_type === 'TimePicker'"
                      class="el-form-item"
                    >
                      <el-time-select
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                        :picker-options="{
                          start: '00:00',
                          step: '00:30',
                          end: '24:00'
                        }"
                        placeholder="选择时间"
                      >
                      </el-time-select>
                    </el-form-item>
                    <!-- DatePicker -->
                    <el-form-item
                      :label="kkk"
                      :prop="kkk"
                      v-if="vvv.iterm_type === 'DatePicker'"
                      class="el-form-item"
                    >
                      <el-date-picker
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <!-- DateTimePicker -->
                    <el-form-item
                      :label="kkk"
                      :prop="kkk"
                      v-if="vvv.iterm_type === 'DateTimePicker'"
                      class="el-form-item"
                    >
                      <el-date-picker
                        v-model="jobTemplateUpdateTemp.mate_data[iii[0]][kkk]"
                        type="datetime"
                        placeholder="选择日期"
                        align="right"
                        :picker-options="pickerOptions"
                        style="width: 350px"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <!-- </div> -->
                  </div>
                </div>
                <div>
                  <div>
                    <el-button
                      circle
                      :icon="iii.isRun ? 'el-icon-loading' : 'el-icon-thumb'"
                      @click="
                        runJob(iii[0]);
                        iii.isRun = !iii.isRun;
                      "
                    />
                  </div>
                  <div style="margin-top: 15px">
                    <el-button
                      circle
                      icon="el-icon-edit"
                      @click="updataOneJob(iii)"
                    />
                  </div>
                  <div style="margin-top: 15px">
                    <el-button
                      circle
                      icon="el-icon-delete"
                      @click="delOneJob(iii, nnn)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </draggable>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="success" @click="runAllJob()"> run_all </el-button>
            <el-button type="primary" @click="updateJobInfo()">
              更新
            </el-button>
            <el-button @click="cancel()"> 取消 </el-button>
          </div>
        </div>
      </el-dialog>
    </div>

    <!--------编辑表单页面--------->
    <el-card v-else class="edit-card-bottom" shadow="never">
      <el-page-header
        @back="goBack"
        content="创建任务详情"
        class="el-page-header"
      >
      </el-page-header>
      <div class="edit-body">
        <!-- 字段待选区 -->
        <el-card class="search-card" shadow="never">
          <div class="searchText">
            <el-input
              v-model="searchText"
              class="search-input"
              placeholder="请输入内容搜索相关字段"
              prefix-icon="el-icon-search"
              style="width: 75%; margin-right: 5px; font-size: 0.2rem"
            >
            </el-input>
            <el-button
              @click="addJobOrderTemplate"
              round
              style="background-color: #38c08f; color: #fff; font-size: 0.25rem"
            >
              <span v-if="isJobOrderTemplate">添加新模板</span>
              <span v-else>返回模板列表</span>
            </el-button>
          </div>
          <div class="job-order-template" v-if="isJobOrderTemplate">
            <div class="add-template" v-if="!templateDraggableList.length">
              暂无模板，请添加
            </div>
            <draggable
              class="searchDraggable"
              v-model="templateDraggableList"
              :group="{ name: 'editGroup', pull: 'clone', put: true }"
              chosenClass="chosen"
              :move="handleMove"
              :scroll="true"
              :sort="false"
              @start="handleStart"
            >
              <div
                class="search-item"
                v-for="(item, index) in templateDraggableList"
                :key="index"
              >
                <div>
                  {{ item.name }}
                </div>
              </div>
            </draggable>
          </div>
          <div class="job-order-field" v-else>
            <draggable
              class="searchDraggable"
              v-model="searchDraggableList"
              :group="{ name: 'editGroup', pull: 'clone', put: true }"
              chosenClass="chosen"
              @change="handleRemove"
              :move="handleMove"
              :scroll="true"
              :sort="false"
            >
              <el-card
                class="search-item"
                v-for="item in searchDraggableList"
                :key="item.id"
                shadow="never"
              >
                {{ item.name }}
              </el-card>
            </draggable>
          </div>
        </el-card>
        <!-- 表单编辑card -->
        <el-card
          class="edit-card"
          shadow="never"
          v-loading="loading"
          element-loading-text="提交中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.7)"
        >
          <div class="title">
            <div v-if="!templateEditList.length && isJobOrderTemplate">
              将左侧Job模板拖到此处编辑
            </div>
            <div v-if="!editList.length && !isJobOrderTemplate">
              将左侧字段拖到此处进行模板编辑
            </div>
          </div>
          <!-- 编辑区域 -->
          <div>
            <el-form
              ref="templateDataForm"
              :model="jobTemplateTemp"
              label-position="left"
              label-width="150px"
              class="edit-form"
              v-if="isJobOrderTemplate"
            >
              <draggable
                class="editDraggable"
                group="editGroup"
                v-model="templateEditList"
                :scroll="true"
                chosenClass="chosenn"
                @change="handleRemove"
              >
                <div v-for="item in templateEditList" :key="item.id">
                  <div class="templateTitle">{{ item.name }}</div>
                  <div
                    v-for="(val, key) in JSON.parse(item.order_filed)"
                    :key="key"
                  >
                    <!-- {{ key }}---{{ val }} -->

                    <el-form-item
                      :label="key"
                      :prop="key"
                      v-if="val.iterm_type === 'Input'"
                      class="el-form-item"
                    >
                      <el-input
                        style="width: 350px"
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 5 }"
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                        placeholder="请输入内容"
                      />
                    </el-form-item>
                    <!-- Radio -->
                    <el-form-item
                      :label="key"
                      :prop="key"
                      v-if="val.iterm_type === 'Radio'"
                      class="el-form-item"
                    >
                      <el-radio
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                        :lable="true"
                        >是</el-radio
                      >
                      <el-radio
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                        :label="false"
                        >否</el-radio
                      >
                    </el-form-item>
                    <!-- Checkbox -->
                    <el-form-item
                      :label="key"
                      :prop="key"
                      v-if="val.iterm_type === 'Checkbox'"
                      class="el-form-item"
                    >
                      <el-checkbox
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                        >未定义</el-checkbox
                      >
                    </el-form-item>
                    <!-- InputNumber -->
                    <el-form-item
                      :label="key"
                      :prop="key"
                      v-if="val.iterm_type === 'InputNumber'"
                      class="el-form-item"
                    >
                      <el-input-number
                        :min="1"
                        :max="10"
                        label="描述文字"
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                      ></el-input-number>
                    </el-form-item>
                    <!-- Select -->
                    <el-form-item
                      :label="key"
                      :prop="key"
                      v-if="val.iterm_type === 'Select'"
                      class="el-form-item"
                    >
                      <el-select
                        v-if="!val.enum_list"
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                        :filterable="
                          val.link_field != null && val.link_models != null
                        "
                        :remote="
                          val.link_field != null && val.link_models != null
                        "
                        :remote-method="remoteMethod"
                        :placeholder="
                          val.link_field != null && val.link_models != null
                            ? '🔍   请输入关键词搜索'
                            : ''
                        "
                        style="width: 250px"
                      >
                        <template
                          ><el-option
                            v-for="a in filedDataList"
                            :key="a.id"
                            :label="a.name || a.image_name"
                            :value="a.id"
                          ></el-option
                        ></template>
                      </el-select>
                      <el-select
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                        placeholder="请选择"
                        v-else
                      >
                        <template>
                          <el-option
                            v-for="i in val.enum_list.split(',')"
                            :key="i"
                            :label="i"
                            :value="i"
                          >
                          </el-option>
                        </template>
                      </el-select>
                    </el-form-item>
                    <!-- Cascader -->
                    <el-form-item
                      :label="key"
                      :prop="key"
                      v-if="val.iterm_type === 'Cascader'"
                      class="el-form-item"
                    >
                      <el-cascader
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                      ></el-cascader>
                    </el-form-item>
                    <!-- Switch -->
                    <el-form-item
                      :label="key"
                      :prop="key"
                      v-if="val.iterm_type === 'Switch'"
                      class="el-form-item"
                    >
                      <el-switch
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      >
                      </el-switch>
                    </el-form-item>
                    <!-- Slider -->
                    <el-form-item
                      :label="key"
                      :prop="key"
                      v-if="val.iterm_type === 'Slider'"
                      class="el-form-item"
                    >
                      <el-slider
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                      ></el-slider>
                    </el-form-item>
                    <!-- TimePicker -->
                    <el-form-item
                      :label="key"
                      :prop="key"
                      v-if="val.iterm_type === 'TimePicker'"
                      class="el-form-item"
                    >
                      <el-time-select
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                        :picker-options="{
                          start: '00:00',
                          step: '00:30',
                          end: '24:00'
                        }"
                        placeholder="选择时间"
                      >
                      </el-time-select>
                    </el-form-item>
                    <!-- DatePicker -->
                    <el-form-item
                      :label="key"
                      :prop="key"
                      v-if="val.iterm_type === 'DatePicker'"
                      class="el-form-item"
                    >
                      <el-date-picker
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <!-- DateTimePicker -->
                    <el-form-item
                      :label="key"
                      :prop="key"
                      v-if="val.iterm_type === 'DateTimePicker'"
                      class="el-form-item"
                    >
                      <el-date-picker
                        v-model="jobTemplateTemp.mate_data[item.name][key]"
                        type="datetime"
                        :placeholder="val.defaultVal"
                        align="right"
                        :picker-options="pickerOptions"
                        style="width: 350px"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </div>
              </draggable>
            </el-form>
            <el-form
              ref="dataForm"
              :model="temp"
              label-position="left"
              label-width="150px"
              class="edit-form"
              v-else
            >
              <div
                @click="editTemplateName"
                v-if="!dialogVisible"
                class="templateName"
              >
                <div>template_name</div>
                {{ templateName }}
              </div>
              <draggable
                class="editDraggable"
                group="editGroup"
                v-model="editList"
                :scroll="true"
                chosenClass="chosenn"
                @change="handleRemove"
                @start="editStart"
              >
                <div v-for="item in editList" :key="item.id">
                  <!-- input -->
                  <el-form-item
                    :label="item.name"
                    :prop="item.name"
                    v-if="item.iterm_type === 'Input'"
                    class="el-form-item"
                  >
                    <el-input
                      style="width: 350px"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 5 }"
                      v-model="temp.mate_data[item.name]"
                      placeholder="请输入内容"
                      disabled
                    />
                  </el-form-item>
                  <!-- Radio -->
                  <el-form-item
                    :label="item.name"
                    :prop="item.name"
                    v-if="item.iterm_type === 'Radio'"
                    class="el-form-item"
                  >
                    <el-radio
                      v-model="temp.mate_data[item.name]"
                      :lable="true"
                      disabled
                      >是</el-radio
                    >
                    <el-radio
                      v-model="temp.mate_data[item.name]"
                      :label="false"
                      disabled
                      >否</el-radio
                    >
                  </el-form-item>
                  <!-- Checkbox -->
                  <el-form-item
                    :label="item.name"
                    :prop="item.name"
                    v-if="item.iterm_type === 'Checkbox'"
                    class="el-form-item"
                  >
                    <el-checkbox v-model="temp.mate_data[item.name]" disabled
                      >未定义</el-checkbox
                    >
                  </el-form-item>
                  <!-- InputNumber -->
                  <el-form-item
                    :label="item.name"
                    :prop="item.name"
                    v-if="item.iterm_type === 'InputNumber'"
                    class="el-form-item"
                  >
                    <el-input-number
                      :min="1"
                      :max="10"
                      label="描述文字"
                      v-model="temp.mate_data[item.name]"
                      disabled
                    ></el-input-number>
                  </el-form-item>
                  <!-- Select -->
                  <el-form-item
                    :label="item.name"
                    :prop="item.name"
                    v-if="item.iterm_type === 'Select'"
                    class="el-form-item"
                  >
                    <el-select
                      v-if="!item.enum_list"
                      v-model="temp.mate_data[item.name]"
                      :filterable="
                        item.link_field != null && item.link_models != null
                      "
                      :remote="
                        item.link_field != null && item.link_models != null
                      "
                      :remote-method="remoteMethod"
                      :placeholder="
                        item.link_field != null && item.link_models != null
                          ? '🔍   请输入关键词搜索'
                          : ''
                      "
                      style="width: 250px"
                      disabled
                    >
                      <template
                        ><el-option
                          v-for="item in filedDataList"
                          :key="item.id"
                          :label="item.name || item.image_name"
                          :value="item.id"
                        ></el-option
                      ></template>
                    </el-select>
                    <el-select
                      v-model="temp.mate_data[item.name]"
                      placeholder="请选择"
                      v-else
                      disabled
                    >
                      <template>
                        <el-option
                          v-for="i in item.enum_list.split(',')"
                          :key="i"
                          :label="i"
                          :value="i"
                        >
                        </el-option>
                      </template>
                    </el-select>
                  </el-form-item>
                  <!-- Cascader -->
                  <el-form-item
                    :label="item.name"
                    :prop="item.name"
                    v-if="item.iterm_type === 'Cascader'"
                    class="el-form-item"
                  >
                    <el-cascader
                      v-model="temp.mate_data[item.name]"
                      disabled
                    ></el-cascader>
                  </el-form-item>
                  <!-- Switch -->
                  <el-form-item
                    :label="item.name"
                    :prop="item.name"
                    v-if="item.iterm_type === 'Switch'"
                    class="el-form-item"
                  >
                    <el-switch
                      v-model="temp.mate_data[item.name]"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    >
                    </el-switch>
                  </el-form-item>
                  <!-- Slider -->
                  <el-form-item
                    :label="item.name"
                    :prop="item.name"
                    v-if="item.iterm_type === 'Slider'"
                    class="el-form-item"
                  >
                    <el-slider v-model="temp.mate_data[item.name]"></el-slider>
                  </el-form-item>
                  <!-- TimePicker -->
                  <el-form-item
                    :label="item.name"
                    :prop="item.name"
                    v-if="item.iterm_type === 'TimePicker'"
                    class="el-form-item"
                  >
                    <el-time-select
                      v-model="temp.mate_data[item.name]"
                      :picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '24:00'
                      }"
                      placeholder="选择时间"
                      disabled
                    >
                    </el-time-select>
                  </el-form-item>
                  <!-- DatePicker -->
                  <el-form-item
                    :label="item.name"
                    :prop="item.name"
                    v-if="item.iterm_type === 'DatePicker'"
                    class="el-form-item"
                  >
                    <el-date-picker
                      v-model="temp.mate_data[item.name]"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions"
                      disabled
                    >
                    </el-date-picker>
                  </el-form-item>
                  <!-- DateTimePicker -->
                  <el-form-item
                    :label="item.name"
                    :prop="item.name"
                    v-if="item.iterm_type === 'DateTimePicker'"
                    class="el-form-item"
                  >
                    <el-date-picker
                      v-model="temp.mate_data[item.name]"
                      type="datetime"
                      placeholder="选择日期时间"
                      align="right"
                      :picker-options="pickerOptions"
                      disabled
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </draggable>
            </el-form>
          </div>
          <!-- 页脚button -->
          <div class="form-foo">
            <div v-if="templateEditList.length && isJobOrderTemplate">
              <el-button type="primary" @click="jobSubmit()"
                >提交任务</el-button
              >
              <el-button @click="getJobOrderTemplateById(templateId)"
                >编辑模板</el-button
              >
            </div>
            <div v-if="editList.length && !isJobOrderTemplate">
              <el-button type="primary" @click="templateSubmit()"
                >提交模板</el-button
              >
              <el-button @click="resetForm">重置模板</el-button>
              <el-button
                type="danger"
                @click="delJobOrderTemplate()"
                :disabled="editType === 'isNotTemplate'"
                :plain="true"
                >删除模板</el-button
              >
            </div>
          </div>
          <el-dialog
            title="添加模板名称"
            destroy-on-close
            :visible.sync="dialogVisible"
          >
            <el-input
              style="widht: 250px; margin-bottom: 25px"
              v-model="templateName"
              placeholder="请输入模板名称"
            />
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()"> 取消 </el-button>
              <el-button type="primary" @click="save()"> 确认 </el-button>
            </div>
          </el-dialog>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getJobOrderField,
  getFiledDataById,
  getJobOrder,
  addJobOrder,
  getJobOrderTemplate,
  addJobOrderTemplate,
  delJobOrder,
  delJobOrderTemplate,
  getJobOrderTemplateDetailById,
  updateJobOrderTemplate,
  updateJobOrder
} from "@/api/job";
import Dialog from "@/components/Dialog";
import Pagination from "@/components/Pagination";
import draggable from "vuedraggable";

export default {
  name: "deploy_env",
  components: { Dialog, Pagination, draggable },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      editList: [],
      templateEditList: [],
      templateUpdateList: [],
      searchDraggableList: [],
      templateDraggableList: [],
      abc: [],
      isJobOrderTemplate: true,
      isEdit: false,
      loading: false,
      isRun: false,
      submitType: "create",
      //request
      orderNumberSearchText: "",
      searchText: "",
      templateName: "",
      templateId: 0,
      jobDialogVisible: false,
      dialogVisible: false,
      textMap: {
        isTemplate: "提交任务",
        isNotTemplate: "创建模板"
      },
      editType: "isTemplate",
      temp: {
        mate_data: {}
      },
      jobTemplateTemp: {
        mate_data: {}
      },
      jobTemplateUpdateTemp: {
        id: 0,
        order_number: 0,
        mate_data: {}
      },
      jobCreateObject: {
        id: 0,
        order_number: "",
        mate_data: ""
      },
      jobTemplateUpdateObject: {
        id: 0,
        mate_data: {},
        order_number: 0
      },
      jobTemplateCreateObject: {
        name: "",
        order_filed: ""
      },
      listQuery: {
        id: "",
        page: 1,
        page_size: 20,
        search: "",
        ordering: "id"
      },
      //response
      JobOrderTableList: [],
      filedDataList: [],
      JobOrderTableListTitle: [],
      JobOrderNumberList: [],
      JobOrderIdList: [],
      total: 0
    };
  },
  mounted() {
    this.searchOrderField();
    this.getJobOrderList();
    this.templateJobOrderList();
  },
  watch: {
    searchText(val) {
      this.listQuery.search = val;
      getJobOrderField(this.listQuery).then(res => {
        this.searchDraggableList = res.data.results;
      });
    },
    orderNumberSearchText(newVal, oldVal) {
      if (newVal === "") {
        this.getJobOrderList();
      }
    }
  },
  methods: {
    //reset请求字段
    resetListQuery() {
      this.listQuery = {
        id: "",
        page: 1,
        page_size: 20,
        search: "",
        ordering: "id"
      };
    },
    //select组件服务器搜索回调
    remoteMethod(text) {
      this.listQuery.search = text;
      this.getFiledDataByIdList();
    },
    //select组件服务器搜索回调
    getFiledDataByIdList() {
      getFiledDataById(this.listQuery).then(res => {
        this.filedDataList = res.data.results;
      });
    },
    //select组件服务器搜索回调
    searchOrderField() {
      this.resetListQuery();
      this.listQuery.search = "a";
      getJobOrderField(this.listQuery).then(res => {
        this.searchDraggableList = res.data.results;
      });
    },
    //任务模板list
    templateJobOrderList() {
      this.resetListQuery();
      getJobOrderTemplate(this.listQuery).then(res => {
        this.templateDraggableList = res.data.results;
      });
    },
    //格式化任务模板temp
    formatTemplateTemp() {
      this.templateDraggableList.map(e => {
        this.$set(this.jobTemplateTemp.mate_data, e.name, {
          id: e.id,
          order_filed: e.order_filed
        });
      });
    },
    //获取任务list
    getJobOrderList() {
      this.resetListQuery();
      this.listQuery.ordering = "order_number";
      getJobOrder(this.listQuery).then(res => {
        console.log("aaaaaaaa", res);
        this.JobOrderTableList = res.data.results;
      });
    },
    handleSearch() {
      this.listQuery.search = this.orderNumberSearchText;
      getJobOrder(this.listQuery).then(res => {
        if (res.data) {
          this.JobOrderTableList = res.data.results;
          this.total = res.data.count;
        } else {
          this.$message.error("没有相关数据");
        }
      });
    },
    //draggable数组源变化后的回调
    handleRemove(evt) {
      console.log(evt);
      if (evt.added) {
        this.listQuery.id = evt.added.element.id;
        if (this.isJobOrderTemplate) {
          this.templateId = evt.added.element.id;
          // if (this.jobTemplateTemp.mate_data != null) {
          //   this.jobTemplateTemp = {
          //     mate_data: {},
          //   };
          // }
          // this.$set(this.jobTemplateTemp.mate_data, evt.added.element.name, {
          // });
        } else {
          this.$set(
            this.temp.mate_data,
            evt.added.element.name,
            evt.added.element
          );
        }
      }
    },
    //开始拖拽回调格式化jobTemplateTemp
    handleStart() {
      this.formatTemplateTemp();
    },
    editStart() {
      console.log("aaaaaa");
    },
    //拖动字段或模板回调
    handleMove(evt) {
      if (this.isJobOrderTemplate) {
        this.templateEditList = [];
      }
      this.editList.map(e => {
        if (e.name.indexOf(evt.draggedContext.element.name) != -1) {
          let doms = document.getElementsByClassName("el-message")[0];
          if (doms == undefined) {
            this.$message({
              message: "警告哦，这个字段已经存在了",
              type: "warning"
            });
          }
          this.editList.splice(
            this.editList.findIndex(
              item => item.name === evt.draggedContext.element.name
            ),
            1
          );
        }
      });
    },
    //跳转编辑页面
    goEditPage() {
      this.isEdit = true;
      this.submitType = "create";
      this.formatTemplateTemp();
      this.isJobOrderTemplate = true;
      this.resetForm();
    },
    //返回主页
    goBack() {
      this.isEdit = false;
      this.jobCreateObject = {
        id: 0,
        order_number: "",
        mate_data: ""
      };
      // this.resetForm();
    },
    //获取任务工单号
    getCurrentDate(separator = "") {
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      let hour = new Date().getHours(); //得到小时
      let minu = new Date().getMinutes(); //得到分钟
      let sec = new Date().getSeconds();
      return `${year}${month < 10 ? `0${month}` : `${month}`}${
        date < 10 ? `0${date}` : `${date}`
      }${hour < 10 ? `0${hour}` : `${hour}`}${separator}${
        minu < 10 ? `0${minu}` : `${minu}`
      }${separator}${sec < 10 ? `0${sec}` : `${sec}`}`;
    },
    //过滤要提交的任务
    filterSubmitJob() {
      let _list = [];
      let _lists = [];
      for (let aa in this.jobTemplateTemp.mate_data) {
        _list.push([aa, this.jobTemplateTemp.mate_data[aa]]);
      }
      this.templateEditList.map(e => {
        let a = _list.filter(d => {
          return d[0] === e.name;
        });
        _lists.push(...a);
      });

      this.jobTemplateTemp = { mate_data: {} };
      for (let i of _lists) {
        this.jobTemplateTemp.mate_data[i[0]] = i[1];
      }
    },
    //添加任务
    jobSubmit() {
      this.loading = true;
      //提交表单内容
      if (this.jobCreateObject.order_number) {
        this.jobCreateObject.order_number = this.jobCreateObject.order_number;
      } else {
        this.jobCreateObject.order_number = this.getCurrentDate();
      }
      this.filterSubmitJob();

      if (this.submitType === "create") {
        this.jobCreateObject.mate_data = JSON.stringify(
          this.jobTemplateTemp.mate_data
        );
        addJobOrder(this.jobCreateObject).then(() => {
          this.JobOrderTableList = [];
          this.getJobOrderList();
        });
      } else {
        let aaa = { ...this.jobTemplateTemp.mate_data };
        this.jobCreateObject.mate_data = JSON.stringify(
          Object.assign(this.jobCreateObject.mate_data, aaa)
        );
        updateJobOrder(this.jobCreateObject.id, this.jobCreateObject).then(
          () => {
            // this.JobOrderTableList = []
            this.getJobOrderList();
          }
        );
      }

      setTimeout(() => {
        this.loading = false;
        this.isEdit = false;
      }, 500);
      setTimeout(() => {
        this.$notify({
          title: "success",
          message: "添加成功",
          type: "success",
          duration: 2000
        });
      }, 500);
      this.resetForm();
    },
    //任务模板待选区切换
    addJobOrderTemplate() {
      this.isJobOrderTemplate = !this.isJobOrderTemplate;
      this.searchText = "";
      if (!this.isJobOrderTemplate) {
        this.editType = "isNotTemplate";
        this.dialogVisible = true;
        this.templateName = "";
        this.editList = [];
        this.temp = { mate_data: {} };
      } else {
        this.editType = "isTemplate";
        this.submitType = "create";
        this.formatTemplateTemp();
      }
    },
    //添加任务模板
    templateSubmit() {
      this.jobTemplateCreateObject.name = this.templateName;
      this.jobTemplateCreateObject.order_filed = JSON.stringify(
        this.temp.mate_data
      );
      if (this.submitType === "create") {
        addJobOrderTemplate(this.jobTemplateCreateObject).then(() => {
          this.templateJobOrderList();
          this.isJobOrderTemplate = true;
          this.editList = [];
          this.temp.mate_data = {};
          // this.$set(this.jobTemplateTemp.mate_data,this.templateName,{})
          this.$notify({
            title: "success",
            message: "添加成功",
            type: "success",
            duration: 2000
          });
        });
      } else {
        if (!this.templateUpdateList.length) {
          updateJobOrderTemplate(
            this.templateId,
            this.jobTemplateCreateObject
          ).then(() => {
            this.templateJobOrderList();
            this.isJobOrderTemplate = true;
            this.templateEditList[0].order_filed = JSON.stringify(
              this.temp.mate_data
            );
            this.jobTemplateTemp.mate_data[
              this.templateName
            ].order_filed = JSON.stringify(this.temp.mate_data);
            if (this.jobCreateObject.order_number) {
              this.submitType = "update";
            } else {
              this.submitType = "create";
            }
            this.editList = [];
            this.temp.mate_data = {};
            this.$notify({
              title: "success",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          this.jobTemplateUpdateTemp.mate_data[
            this.templateName
          ].order_filed = JSON.stringify(this.temp.mate_data);
          this.updateJobInfo();
          this.isEdit = false;
          this.templateName = "";
          this.isJobOrderTemplate = true;
        }
      }
    },
    //更新单条任务字段
    updataOneJob(job) {
      this.isEdit = true;
      this.isJobOrderTemplate = false;
      this.submitType = "update";
      this.templateName = job[0];
      this.templateId = job[1].id;
      this.editList = [];
      this.temp = { mate_data: {} };
      for (let i in JSON.parse(job[1].order_filed)) {
        this.editList.push(JSON.parse(job[1].order_filed)[i]);
        this.temp.mate_data[i] = JSON.parse(job[1].order_filed)[i];
      }
    },
    //执行单条任务
    runJob() {
      this.isRun = !this.isRun;
    },
    //执行所有任务
    runAllJob() {},
    //任务编辑更新或执行
    handleJob(jobItem) {
      this.jobDialogVisible = true;
      let aa = JSON.parse(jobItem.mate_data);
      this.jobTemplateUpdateTemp.mate_data = aa;
      this.jobTemplateUpdateObject.id = jobItem.id;
      this.jobTemplateUpdateTemp.id = jobItem.id;
      this.jobTemplateUpdateTemp.order_number = jobItem.order_number;
      this.jobTemplateUpdateObject.order_number = jobItem.order_number;
      this.templateUpdateList = [];
      for (let i in aa) {
        this.templateUpdateList.push([i, aa[i]]);
      }
    },
    //更新任务按钮回调
    updateJobInfo() {
      this.jobTemplateUpdateObject.mate_data = JSON.stringify(
        this.jobTemplateUpdateTemp.mate_data
      );
      updateJobOrder(
        this.jobTemplateUpdateObject.id,
        this.jobTemplateUpdateObject
      ).then(() => {
        if (this.submitType === "create") {
          this.jobDialogVisible = false;
          this.resetForm();
        } else {
          this.submitType = "create";
        }
        this.JobOrderTableList = [];
        this.getJobOrderList();
        this.$notify({
          title: "success",
          message: "添加成功",
          type: "success",
          duration: 2000
        });
      });
    },
    //向orderNumber里添加任务条目
    updateJobOrderByOrderNumber(item) {
      this.submitType = "update";
      this.isEdit = true;
      this.isJobOrderTemplate = true;
      this.jobCreateObject.id = item.id;
      this.jobCreateObject.order_number = item.order_number;
      this.jobCreateObject.mate_data = JSON.parse(item.mate_data);
    },
    //删除整个orderNumber任务
    delJobOrderByOrderNumber(id) {
      delJobOrder(id).then(() => {
        this.getJobOrderList();
      });
    },
    //删除orderNumber里的某一条数据
    delOneJob(job, index) {
      this.templateUpdateList.splice(index, 1);
      delete this.jobTemplateUpdateTemp.mate_data[job[0]];
      this.submitType = "update";
      this.updateJobInfo();
    },
    //展开任务模板详情
    getJobOrderTemplateById(id) {
      this.submitType = "update";
      getJobOrderTemplateDetailById(id).then(res => {
        this.isJobOrderTemplate = false;
        this.templateName = res.data.name;
        this.templateId = res.data.id;
        let a = JSON.parse(res.data.order_filed);
        this.editList = [];
        this.temp.mate_data = {};
        for (let key in a) {
          this.editList.push(a[key]);
          this.temp.mate_data[key] = a[key];
        }
      });
    },
    //删除任务模板
    delJobOrderTemplate() {
      delJobOrderTemplate(this.templateId).then(() => {
        this.$message({
          message: "模板删除成功",
          type: "success"
        });
        this.isJobOrderTemplate = true;
        this.templateJobOrderList();
      });
    },
    //重置表单内容
    resetForm() {
      this.editList = [];
      this.templateEditList = [];
      this.templateUpdateList = [];
      this.temp = { mate_data: {} };
      this.jobTemplateTemp = { mate_data: {} };
    },
    //填写模板名称
    editTemplateName() {
      this.dialogVisible = true;
    },
    save() {
      if (this.templateName) {
        this.dialogVisible = false;
      } else {
        this.$message.error("模板名称为必填项");
      }
    },
    cancel() {
      this.dialogVisible = false;
      this.jobDialogVisible = false;
    }
  }
};
</script>

<style>
.ops-job-createJob {
  width: 100%;
  height: 95vh;
  background-color: #f2f2f3;
}
.box-cardd {
  padding: 15px 25px;
  border: 0px;
  position: absolute;
  top: 5px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #f2f2f3;
  width: 100%;
}
.el-icon-loading,
.el-loading-text {
  color: #38c08f !important;
}
.foo {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
}
.pagination {
  margin-top: 15px;
}
.job {
  margin-top: 15px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 80vh;
}
.zDraggable {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 5px;
}
.job-item {
  position: relative;
  background-color: #fff;
  width: 100%;
  padding: 5px;
  margin: 5px 0px;
  border-radius: 10px;
}
.no-job {
  text-align: center;

  font-size: 0.5rem;
  color: #999;
}
.job-item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 5px 15px;
  box-shadow: 0px 0px 10px rgba(153, 153, 153, 0.3);
}
.el-timeline-i {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0px 1px 1px rgba(153, 153, 153, 0.3);
  padding-right: 15px;
  padding-bottom: 5px;
  /* border: 1px solid blue; */
}
.template-name {
  /* border: 1px solid red; */
}
.active {
  display: flex;
  flex-direction: column;
}
.template-name div {
  height: 0.5rem;
  margin-top: 15px;
  /* border: 1px solid green; */
}
.el-page-header__title {
  font-size: 20px;
}
.bgDiv {
  font-size: 35px;
  font-family: Helvetica, sans-serif;
  color: #d1d1d8;
}
.edit-card-bottom {
  width: 100%;
  height: 100%;
  padding: 25px 25px 15px;
  background-color: #f2f2f3;
  border: 0px;
}
.edit-body {
  display: flex;
  justify-content: space-between;
}
.edit-card {
  width: 75%;
  height: 75vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  margin: 25px 0px 0px 15px;
  min-height: 250px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  display: inline-block;
  vertical-align: top;
  border-radius: 10px;
  position: relative;
  border: 0px;
}
.title {
  font-family: Helvetica, sans-serif;
  font-size: 25px;
  color: #c0c4cc;
  position: absolute;
  left: 35px;
  top: 30px;
}
.templateTitle {
  font-family: Helvetica, sans-serif;
  font-size: 0.5rem;
}
.edit-form {
  /* min-width: 750px;
  min-height: 350px; */
  background-color: transparent;
  z-index: 10;
}
.templateName {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Helvetica, sans-serif;
  color: rgba(56, 192, 143, 0.5);
  text-align: center;
}
.editDraggable {
  display: flex;
  flex-direction: column;
  /* border: 1px solid blue; */
  min-height: 50px;
  margin-bottom: 25px;
}
.search-card {
  width: 25%;
  height: 65vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 25px;
  padding: 15px;
  border-radius: 10px;
  display: inline-block;
  border: 0px;
}
.searchText {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.add-template {
  font-family: Helvetica, sans-serif;
  font-size: 0.5rem;
  margin-top: 25px;
  color: #c0c4cc;
}
.searchDraggable {
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
}
.search-item {
  padding: 5px 10px;
  margin: 7.5px;
  border-radius: 35px;
  background-color: #38c08f;
  color: #fff;
  font-size: 0.3rem;
  position: relative;
}
.form-foo {
  margin-top: 35px;
  margin-left: 15px;
}
.el-form-item {
  margin-top: 15px;
  width: 350px;
  /* border: 1px solid skyblue; */
}
.chosen {
  background-color: #fff;
  color: #38c08f;
}
</style>
