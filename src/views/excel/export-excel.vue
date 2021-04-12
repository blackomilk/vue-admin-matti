<template>
  <div class="app-container">
    <div class="top-option">
      <FileNameOption v-model="filename" />
      <BookTypeOption v-model="booktype" />
      <div>
        <el-button
          style="margin: 0 0 20px 20px"
          type="primary"
          icon="el-icon-document"
          @click="handleDowload"
        >
          Export Excel
        </el-button>
      </div>
    </div>

    <el-table
      :data="list"
      border
      fit
      stripe
      class="el-table"
      :row-style="{ height: '65px' }"
    >
      <el-table-column align="center" label="id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{
            scope.row.timestamp | aa
          }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from "@/api/file";
import { parseTime } from "@/utils";

import FileNameOption from "./components/file-name-option";
import BookTypeOption from "./components/book-type-option";
export default {
  name: "export-excel",
  components: {
    FileNameOption,
    BookTypeOption
  },
  data() {
    return {
      list: [],
      filename: "",
      booktype: "xlsx"
    };
  },
  mounted() {
    this.getList();
  },
  filters: {
    aa(val) {
     return parseTime(val);
    }
  },
  methods: {
    getList() {
      fetchList().then(res => {
        this.list = res.data.items;
      });
    },
    handleDowload() {
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
        const filterVal = [
          "id",
          "title",
          "author",
          "pageviews",
          "display_time"
        ];
        const list = this.list;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          bookType: this.booktype
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>

<style scoped>
.top-option {
  display: flex;
  justify-content: flex-start;
  align-content: center;
}
</style>
