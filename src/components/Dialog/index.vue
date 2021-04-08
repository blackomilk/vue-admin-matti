<template>
  <el-dialog
    :title="textMap[dialogTitle]"
    :visible="dialogFormVisible"
    @close="close"
    destroy-on-close
    style="width: 100%"
  >
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel"> 取消 </el-button>
      <!-- <el-button type="success" @click="addFormItem">新增条目</el-button> -->
      <el-button v-if="dialogTitle === 'check'" type="success" @click="check()">
        更新
      </el-button>
      <el-button
        v-else
        type="primary"
        @click="dialogTitle === 'create' ? create() : update()"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "dialogbox",
  props: {
    dialogTitle: {
      type: String,
      default() {
        return "";
      },
    },
    dialogFormVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      textMap: {
        create: "创建",
        check: "查看",
        update: "更新",
      },
    };
  },
  methods: {
    cancel() {
      this.$emit("dialogCancel");
    },
    check() {
      this.$emit("dialogCheck");
    },
    create() {
      this.$emit("dialogCreate");
    },
    update() {
      this.$emit("dialogUpdate");
    },
    close() {
      this.$emit("dialogClose");
    },
  },
};
</script>

<style scoped>
</style>