<template>
  <div class="content">
    <span class="book-type">booktype:</span>
    <el-select v-model="bookType" style="width: 120px">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  name: "book-type",
  props: {
    value: {
      type: String,
      default() {
        return "xlsx";
      }
    }
  },
  data() {
    return {
      options: ["xlsx", "csv", "txt"]
    };
  },
  computed: {
    bookType: {
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
 .book-type {
    display: inline-block;
    font-size: 0.5rem;
    color: #4f5053;
    vertical-align: bottom;
    margin-left: 15px;
  }
</style>
