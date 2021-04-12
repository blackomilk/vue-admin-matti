<template>
  <div class="content">
    <span class="filename">filename:</span>
    <el-input
      v-model="filename"
      placeholder="请输入导出文件后的名称"
      style="width: 345px"
      prefix-icon="el-icon-document"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: "filename",
  props: {
    value: {
      type: String,
      default() {
        return "";
      }
    }
  },
  computed: {
    filename: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style scoped>
  .filename {
    display: inline-block;
    font-size: 0.5rem;
    color: #4f5053;
    vertical-align: bottom;
    margin-left: 15px;
  }
</style>
