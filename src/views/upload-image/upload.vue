<template>
  <div class="content">
    <img class="img" :src="image" />
    <el-button
      type="primary"
      icon="el-icon-upload"
      @click="imageCropperShow = true"
    >
      修改头像
    </el-button>

    <ImageCropper
      v-show="imageCropperShow"
      :key="imageCropperKey"
      :width="300"
      :height="300"
      url="https:/httpbin.org/post"
      lang-type='en'
      @close="close"
      @crop-upload-success='cropSuccess'
    />
  </div>
</template>

<script>
import ImageCropper from "@/components/ImageCropper";

export default {
  name: "upload",
  components: {
    ImageCropper
  },
  data() {
    return {
      imageCropperShow: false,
      imageCropperKey: 0,
      image: "https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191"
    };
  },
  methods: {
    cropSuccess(resData) {
      this.imageCropperShow = false;
      this.imageCropperKey = this.imageCropperKey + 1;
      this.image = resData.files.avatar;
    },
    close() {
      this.imageCropperShow = false;
    }
  }
};
</script>

<style scoped>
.img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
}
</style>
