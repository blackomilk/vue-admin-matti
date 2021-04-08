<template>
  <el-table style="width: 100%" :data="dataList" border fit>
    <el-table-column
      v-for="(item, index) in titleList"
      :key="index"
      :label="item"
      :prop="item"
      align="center"
    >
      <template slot-scope="scope">
        <div>
          {{ filtersTableData(scope.row[item]) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="actions" label="actions" align="center">
      <template slot-scope="{ row, $index }">
        <el-button
          v-if="showBtn"
          type="primary"
          size="mini"
          @click="check(row)"
        >
          查看
        </el-button>
        <el-button
          v-if="updateBtn"
          size="mini"
          type="success"
          @click="update(row)"
        >
          更新
        </el-button>
        <el-button
          v-if="deleteBtn"
          size="mini"
          type="danger"
          @click="deletedelete(row.id, $index)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "eltable",
  props: {
    showBtn: {
      type: Boolean,
      default() {
        return true;
      },
    },
    updateBtn: {
      type: Boolean,
      default() {
        return true;
      },
    },
    deleteBtn: {
      type: Boolean,
      default() {
        return true;
      },
    },
    dataList: {
      type: Array,
      default() {
        return [];
      },
    },
    titleList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    filtersTableData(row) {
      if (row instanceof Array) {
        return "点击查看详情";
      } else if (row instanceof Object) {
        let a = JSON.stringify(row);
        a = a.substring(1,a.length-1);
        a = a.replace(/\"/g,"").replace(/\,/g,"           ");
        console.log("aaaaaaaaaaaaaaaaa", typeof a);
        // let items = keys[index] + ':' + values[index] + ';'
        return a;
      } else if (row === null || undefined) {
        return "空";
      } else {
        return row;
      }
    },
    check(row) {
      this.$emit("tableCheck", row);
    },
    update(row) {
      this.$emit("tableUpdate", row);
    },
    deletedelete(id, index) {
      this.$emit("tableDelete", id, index);
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-top: 20px;
}
</style>