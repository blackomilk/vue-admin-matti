<template>
  <div class="content" style="padding: 15px">
    <UploadExcel :onSuccess="handleSuccess" :beforeUpload="beforeUpload" />

    <el-table
      :data="list"
      border
      highlight-current-row
      style="margin-top: 15px"
    >
      <el-table-column
      align="center"
        v-for="item in listHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script>
import UploadExcel from "@/components/UploadExcel/index.vue";

export default {
  name: "upload-excel",
  components: { UploadExcel },
  data() {
    return {
      list: [],
      listHeader: []
    };
  },
  methods: {
    handleSuccess({ results, header }) {
      this.list = results;
      this.listHeader = header;
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      } else {
        this.$message({
          message: "文件超过1M，请重新上传",
          type: "error"
        });
        return false;
      }
    }
  }
};
</script>
